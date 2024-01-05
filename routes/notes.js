// Dependencies
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils.js');
const uuid = require('../helpers/uuid.js');

// Database file
const dbFile = './db/db.json';

// API ROUTES
notes.get('/', (req, res) => {
    console.log('API get');
    readFromFile(dbFile).then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) =>  {
    console.log('API post');
    // Request body restructuring
    if (!(req.body)) {
        res.json('Note could not be saved: No note found');
        return;
    }
    const { title, text } = req.body;
    console.log(`${title}, ${text}`);
    const id = uuid();
    if (title && text) {
        const note = {
            id,
            title,
            text
        };

        readAndAppend(note, dbFile);

        const response = {
            status: 'success',
            body: note,
        };

        res.json(response);

    } else {
        res.json('Note could not be saved: Empty fields');
  }
});

notes.delete('/*', (req, res) => {
    console.log("API delete");
    readFromFile(dbFile).then((data) => {
        let database = JSON.parse(data);
        let noteID = req.url.slice(1);
        let deleteNoteIndex = database.findIndex((element) => element.id == noteID);
        if (deleteNoteIndex === undefined) {
            res.json('Note could not be deleted: Note not found');
        }
        console.log(database[deleteNoteIndex]);
        console.log(database);
        database.splice(deleteNoteIndex, 1);
        writeToFile(dbFile, database);

        const response = {
            status: 'success',
            body: database,
        };

        res.json(response);
    });
});

module.exports = notes;
