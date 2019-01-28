var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "141.152.252.185",
  user: "homebase",
  password: "Homebase",
  port: 12003
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.end();
