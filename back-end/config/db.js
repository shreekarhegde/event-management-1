const mysql = require("mysql");

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "goldtree9",
  database: "EventManagement",
});

module.exports = {
  con,
};
