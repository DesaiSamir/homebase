#!/usr/bin/env node
/**
 * @File   : index.js
 * @Author :  ()
 * @Link   : 
 * @Date   : 2018-1-11 13:16:18
 */
const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')
const app = express()

app.set('port', (process.env.PORT || 3001));

// Express only serves static assets in production
console.log("NODE_ENV: ", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  // Return the main index.html, so react-router render the route in the client
  app.get('/', (req, res) => {
    res.sendFile(path.resolve('client/build', 'index.html'));
  });
} else {
  app.use(express.static('public'))
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())

app.post('/createUser', (req, res) => {
  store
    .createUser({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

app.post('/createCategory', (req, res) => {
  store
    .createCategory({
      category: req.body.category
    })
    .then(() => res.sendStatus(200))
})

app.get('/category', (req, res) => {
  store.getCategory()
    .then((category) => {
      res.status(200).json(category);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
})

app.post('/login', (req, res) => {
  // console.log(req.body);
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      // console.log("status to send: " + success)
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});