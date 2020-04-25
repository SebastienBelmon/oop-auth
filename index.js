const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const authManager = require('./authman')('hardcoded');
const authManager = require('./authman')('rest');

// init express
const app = express();
// body-parser middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

/* ROUTES */
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname + '/html/index.html'));
});

app.get('/', (req, res) => {
  res.redirect('/login');
});

// app.get('/runtests', async (req, res) => {
//   const json_res = await testfunc();
//   console.log(json_res);
// });

// curl -XPOST -d 'username=test' -d 'password=pwd' http://localhost:3000/login
app.post('/login', (req, res) => {
  console.log('Auth request recieved');
  const { username, password } = req.body;

  // validation des credentials ici
  // ici ca va etre le client de ton systeme d'auth

  // on suppose qu'on a fait const authManager = require('auth')('hardcoded')m
  const isCredentialValidated = authManager.validateCredentials(
    username,
    password
  );

  if (isCredentialValidated) {
    res.redirect('/success');
  } else {
    res.redirect('/denied');
  }
});

app.get('/success', (req, res) => {
  res.send('welcome');
});

app.get('/denied', (req, res) => {
  res.send('access denied');
});
/* END ROUTES */

app.listen(3000, () => {
  console.log('app listenting at http://localhost:3000');
});
