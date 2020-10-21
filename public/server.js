const express = require("express");
const path = require("path");
const util = require('util');
const fs = require("fs");
const { uuid } = require("uuidv4");

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

const app = express();
const PORT = process.env.PORT || 3000;
const notes = "/../db/db.json";

// express app set up for server
// body parsing middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

/**
 * ROUTES
 */
// html routes
app.get('/notes', function (req, res) {
    res.sendFile(path.join(__dirname, "./notes.html"));
})
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, "./index.html"));
})

// api routes
app.get('/api/notes', async function (req, res) {
    // reads the db and returns all saved notes as json
    try {
        const data = await asyncReadFile(notes, "utf-8")
        const parsed = JSON.parse(data)
        res.json(parsed);

    } catch (error) {
        console.log(error)
    }
})
app.post('/api/notes', async function (req, res) {
    // receives note to save on req.body, adds it to the db file, returns new note to client
    try {
        // add json data to req body
        const data = await asyncReadFile(notes, "utf-8")
        const id = uuid()
        req.body.id = id;

        const parsed = JSON.parse(data)
        parsed.push(req.body);

        // write to json file
        await asyncWriteFile(notes, JSON.stringify(parsed, null, 2))
        res.json(req.body);

    } catch (error) {
        console.log(error)
    }
})
// app.delete('/api/notes/:id', async (req, res) => {
//     try {
        
//     } catch (error) {
//         console.log(error)
//     }
//     console.log(req)
// })

// listener for server
app.listen(PORT, function() {
    console.log(`listening at http://localhost:${PORT}`);
})