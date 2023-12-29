// Dependencies
const express = require('express');
const path = require('path');

// Server port and declaration
const PORT = 3001;
const app = express();

// HTML ROUTES
app.get('/notes', (req, res) => res.send('notes'));

// 
app.get('/*', (req, res) => res.send('*'))

// API ROUTES
app.get('/api/notes', (req, res) => res.send('API get'));

app.post('/api/notes', (req, res) => res.send('API post'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);