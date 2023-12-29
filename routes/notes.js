const nts = require('express').Router();
const { readAndAppend } = require('../helpers/fsUtils');
const uuid = require('../helpers/uuid');


// API ROUTES
nts.get('/api/notes', (req, res) => res.send('API get'));

nts.post('/api/notes', (req, res) => res.send('API post'));

modules.export = nts;