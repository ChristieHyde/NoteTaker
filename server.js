// Dependencies
const express = require('express');
const path = require('path');

// Server port and declaration
const PORT = process.env.PORT || 3002;
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routing
const api = require('./routes/index');
app.use('/api', api);

// HTML ROUTES
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/*', (req, res) =>  {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);