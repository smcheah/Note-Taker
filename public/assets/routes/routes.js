/**
 * ROUTES
 */
const path = require("path");
const util = require("util");
const fs = require("fs");
const { uuid } = require("uuidv4");

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

const notes = "./db/db.json";

module.exports = function (app) {
    // html routes
	app.get("/notes", function (req, res) {
		res.sendFile(path.join(__dirname, "../../notes.html"));
	});

	app.get("/", function (req, res) {
		res.sendFile(path.join(__dirname, "../../index.html"));
	});

    // api routes
	app.get("/api/notes", async function (req, res) {
		try {
            // reads the db and gets all saved notes as json
			const data = await asyncReadFile(notes, "utf-8");
			const parseNote = JSON.parse(data);

            res.json(parseNote);
            
		} catch (err) {
			console.log(err);
		}
	});

	app.post("/api/notes", async function (req, res) {
		try {
            // receives note to save on req.body, adds it to the db file, returns new note to client
			const data = await asyncReadFile(notes, "utf-8");
			const id = uuid();
            req.body.id = id;
            
			const parseNote = JSON.parse(data);
			parseNote.push(req.body);

			await asyncWriteFile(notes, JSON.stringify(parseNote, null, 2));
            res.json(req.body);
            
		} catch (err) {
			console.log(err);
		}
	});

	app.delete("/api/notes/:id", async function (req, res) {
		try {
			


            
		} catch (err) {
			console.log(err);
		}
	});
};
