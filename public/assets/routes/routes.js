/**
 * ROUTES
 */
const path = require("path");
const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

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
			const parsed = JSON.parse(data);

			res.json(parsed);
		} catch (err) {
			console.log(err);
		}
	});

	app.post("/api/notes", async function (req, res) {
		try {
			const data = await asyncReadFile(notes, "utf-8");

			// assigns an id to req body
			const id = uuidv4();
			req.body.id = id;

			// adds db data to the req body
			const parsed = JSON.parse(data);
			parsed.push(req.body);

			// writes notes to db
			await asyncWriteFile(notes, JSON.stringify(parsed, null, 2));
			res.json(req.body);
		} catch (err) {
			console.log(err);
		}
	});

	app.delete("/api/notes/:id", async function (req, res) {
		try {
			// reads the current db notes
			const data = await asyncReadFile(notes, "utf-8");
			const parsed = JSON.parse(data);

			// removes current element by id
			parsed.forEach((element) => {
				if (element.id === req.params.id) {
					parsed.splice(parsed.indexOf(element));
				}
			});

			await asyncWriteFile(notes, JSON.stringify(parsed, null, 2));
			res.json(req.body);
		} catch (err) {
			console.log(err);
		}
	});
};
