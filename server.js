// Dependencies
const express = require('express');
const path = require('path');

// Server port and declaration
const PORT = 3002;
const app = express();

// API routing
const api = require('./routes/index');
app.use('/api', api);

// HTML ROUTES
app.get('/notes', (req, res) => res.send('notes'));

app.get('/*', (req, res) => res.send('*'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);