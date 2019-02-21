var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sd-home.mynetgear.com",
  user: "homebase",
  password: "Homebase",
  port: 12003
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

connection.end();
