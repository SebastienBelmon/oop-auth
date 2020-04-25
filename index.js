const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

// init express
const app = express();

// body-parser middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* ROUTES */
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.post('/login', (req, res) => {
  console.log('Auth request recieved');
  const { username, password } = req.body;
  console.log(username, password);
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
