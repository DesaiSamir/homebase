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
const mysql = require('mysql');
const conn = require('./mysql')

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
  res.locals.connection = mysql.createConnection(conn.connection);
  next();
});

app.use(bodyParser.json())

function getData(res, query) {
  res.locals.connection.query(query, function (error, results, fields) {
    if (error) 
      res.status(500).json({error});
    else
      res.status(200).json(results);
  });
}

app.post('/getHomebaseData', (req, res) => {
  var query = 'SELECT * from ' + req.body.table_name;

  getData(res, query)
})

app.post('/editRecord', (req, res) => {
  var data = req.body.data;
  if(data.toString() === "[object Object]")
    data = JSON.stringify(data);

  var query = ("call homebase.usp_edit_table_data('" + data + "')");
  getData(res, query)
})


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

app.post('/login', (req, res) => {
  store
    .authenticate({
      username: req.body.username,
      password: req.body.password
    })
    .then(({ success }) => {
      if (success) res.sendStatus(200)
      else res.sendStatus(401)
    })
})

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});