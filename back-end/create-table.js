var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "EventManagement"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE events (name VARCHAR(255), date VARCHAR(255), ID int NOT NULL PRIMARY KEY, start_time TIMESTAMP, end_time TIMESTAMP)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("EVENT Table created");
  });
});