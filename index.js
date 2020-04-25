const express = require('express');
const path = require('path');

const app = express();

/* ROUTES */
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.post('/login', (req, res) => {
  //TODO
});

app.get('/success', (req, res) => {
  //TODO
});

app.get('/denied', (req, res) => {
  //TODO
});
/* END ROUTES */

app.listen(3000, () => {
  console.log('app listenting at http://localhost:3000');
});
