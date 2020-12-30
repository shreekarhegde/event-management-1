const express = require("express");
const { users_db_keys } = require("../constants/db-keys");
const router = express.Router();
const { con } = require("../../config/db");
const { createUserTable } = require("../models/users-table");

router.post("/", (req, res) => {
  createUserTable();
  let { first_name, last_name, ph_num, role } = req.body;
  let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  ph_num = new Number(ph_num);
  const insertQuery = `INSERT INTO users 
        (${users_db_keys.first_name},${users_db_keys.last_name},${users_db_keys.role},${users_db_keys.ph_num},${users_db_keys.created_at}
    ) VALUES ("${first_name}","${last_name}","${role}","${ph_num}","${created_at}")`;
  con.query(insertQuery, function (err, result) {
    console.log("error in user creation", err);
    if (err) throw err;
    console.log("user created::", result);
    res.send({ message: "Created user", result: result });
  });
});

router.get("/latest", (req, res) => {
  con.query(`SELECT * FROM users`, function (err, result) {
    if (err) throw err;
    console.log("user fetched::", result);
    res.send({ message: "latest user!", result: result[result.length - 1] });
  });
})

router.get("/:id", (req, res) => {
  let id = req.params.id;
  con.query(
    `SELECT * FROM users WHERE ${users_db_keys.userID} = ${id}`,
    function (err, result) {
      if (err) throw err;
      console.log("user fetched::", result);
      res.send({ message: "Found User", result: result });
    }
  );
});

router.get("/", (req, res) => {
  con.query(`SELECT * FROM users`, function (err, result) {
    if (err) throw err;
    console.log("user fetched::", result);
    res.send({ message: "All users found!", result: result });
  });
});

router.get("/:id/events", (req, res) => {
  let userID = req.params.id;
  con.query(
    `SELECT * FROM events 
      join venue on events.venueID = venue.venueID
      inner join payment on payment.userID = ${userID} and payment.eventID = events.eventID`,
    function (err, result) {
      if (err) throw err;
      console.log("user fetched::", result);
      res.send({ message: "Users all events found!", result: result });
    }
  );
});

module.exports = {
  usersController: router,
};
