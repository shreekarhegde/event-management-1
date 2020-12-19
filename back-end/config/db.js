const mysql = require("mysql");

const con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "EventManagement",
});

module.exports = {
  con,
};
