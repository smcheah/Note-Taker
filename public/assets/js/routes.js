const express = require("express");
const path = require("path");

const notesData = require("../../../db/db.json")
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

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, "../../index.html"));
})

// URL from database data
app.get('/api/notes', (req, res) => {
    res.json(notesData)
})

app.listen(PORT, () => {
    console.log(`listening at http://localhost:${PORT}`);
})