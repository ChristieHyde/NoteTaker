// Dependencies
const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils.js');

// Database file
const dbFile = './db/db.json';

// API ROUTES
notes.get('/', (req, res) => {
    console.log('API get');
    readFromFile(dbFile).then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) =>  {
    console.log('API post');
    console.log(req.body);
    // Request body restructuring
    if (!(req.body)) {
        res.json('Note could not be saved: No note found');
        return;
    }
    const { title, text } = req.body;
    if (title && text) {
        const note = {
            id: uuid(),
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

module.exports = notes;
