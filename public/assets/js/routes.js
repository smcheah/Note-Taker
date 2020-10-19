const express = require("express");
const path = require("path");

let notesData = require("../../../db/db.json")

const app = express();
const PORT = process.env.PORT || 3000;

// express app set up for server
app.use(express.urlencoded({extended: true}));
app.use(express.json());

/**
 * ROUTES
 */
// URL to html routes
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "../../notes.html"));
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
})

// URL to database data
app.get('/api/notes', (req, res) => {
    res.json(notesData)
})

// listener for server
app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})