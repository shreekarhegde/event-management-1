const { connection } = require('../../config/db');

connection.connect(function(err) {
  if (err) throw err;
  var sql = "CREATE TABLE events (name VARCHAR(255), date VARCHAR(255), ID int NOT NULL PRIMARY KEY, start_time TIMESTAMP, end_time TIMESTAMP)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("EVENT Table created");
  });
});