// Dependencies
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils.js');
const uuid = require('../helpers/uuid.js');

// Database file
const dbFile = './db/db.json';

// API ROUTES
// GET ROUTE
notes.get('/', (req, res) => {
    console.log(`${req.method} called to get all notes`);
    readFromFile(dbFile).then((data) => res.json(JSON.parse(data)));
});

// POST ROUTE
notes.post('/', (req, res) =>  {
    console.log(`${req.method} called to save a note`);
    // Request body restructuring
    if (!(req.body)) {
        res.json('Note could not be saved: No note found');
        return;
    }
    const { title, text } = req.body;
    const id = uuid();
    if (title && text) {
        const note = {
            id,
            title,
            text
        };

        // Write the saved note to the dabase file and return success response
        readAndAppend(note, dbFile);

        const response = {
            status: 'success',
            body: note,
        };

        res.json(response);

    } else {
        // Failure response
        res.json('Note could not be saved: Empty fields');
  }
});

// DELETE ROUTE
notes.delete('/*', (req, res) => {
    console.log(`${req.method} called to delete a note`);
    readFromFile(dbFile).then((data) => {
        // Parse note ID and determine the corresponding database index
        let database = JSON.parse(data);
        let noteID = req.url.slice(1);
        let deleteNoteIndex = database.findIndex((element) => element.id == noteID);
        if (deleteNoteIndex === undefined) {
            res.json('Note could not be deleted: Note not found');
        }

        // Delete note from database and write to file
        database.splice(deleteNoteIndex, 1);
        writeToFile(dbFile, database);

        // Success response
        const response = {
            status: 'success',
            body: database,
        }
        res.json(response);
    });
});

module.exports = notes;
