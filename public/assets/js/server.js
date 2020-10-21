const express = require("express");
const path = require("path");
const util = require('util');
const fs = require("fs");

const asyncReadFile = util.promisify(fs.readFile);
const asyncWriteFile = util.promisify(fs.writeFile);

// let notesData = require("../../../db/db.json")
const notes = "../../../db/db.json";

const app = express();
const PORT = process.env.PORT || 3000;

// express app set up for server
// body parsing middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static(path.join(__dirname, "./index.js")));

/**
 * ROUTES
 */
// html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
})

// api routes
app.get('/api/notes', async (req, res) => {
    // reads the db and returns all saved notes as json
    try {
        const data = await asyncReadFile(notes, "utf8")
        res.json((JSON.parse(data)));

    } catch (error) {
        console.log(error)
    }
    
})
app.post('/api/notes', async (req, res) => {
    // receives note to save on req.body, adds it to the db file, returns new note to client
    try {
        // add json data to req body
        const data = await asyncReadFile(notes, "utf8")
        (JSON.parse(data)).push(req.body);

        // write to json file
        await asyncWriteFile(notes, JSON.stringify((JSON.parse(data)), null, 2))
        res.json(req.body);

    } catch (error) {
        console.log(error)
    }
    
})
app.delete('/api/notes/:id', async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error)
    }
    console.log(req)
})

// listener for server
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})