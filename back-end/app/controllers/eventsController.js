const express = require("express");
const { events_db_keys } = require("../constants/db-keys");
const router = express.Router();
const { con } = require("../../config/db");
const { createEventsTable } = require("../models/event-table");

router.post("/", (req, res) => {
  createEventsTable();
  let { name, venueID, starts_at, ends_at, userID } = req.body;
  starts_at = new Date(starts_at).toISOString().slice(0, 19).replace("T", " ");
  ends_at = new Date(ends_at).toISOString().slice(0, 19).replace("T", " ");
  console.log("");
  const insertQuery = `INSERT INTO events (
        ${events_db_keys.name},
        ${events_db_keys.venueID},
        ${events_db_keys.userID},
        ${events_db_keys.starts_at},
        ${events_db_keys.ends_at}
    ) VALUES ("${name}","${venueID}","${userID}","${starts_at}","${ends_at}")`;

  con.query(insertQuery, function (err, result) {
    console.log("error in events creation", err);
    if (err) throw err;
    console.log("event created::", result);
    res.send({ message: "Created event", result: result });
  });
});

router.get("/:id", (req, res) => {
  let eventID = req.params.id;
  con.query(
    `SELECT * FROM events WHERE ${events_db_keys.eventID} = ${eventID}`,
    function (err, result) {
      if (err) throw err;
      console.log("event fetched::", result);
      res.send({ message: "Found event", result: result });
    }
  );
});

router.get("/", (req, res) => {
  con.query(`SELECT * FROM events`, function (err, result) {
    if (err) throw err;
    console.log("events fetched::", result);
    res.send({ message: "All events found!", result: result });
  });
});

module.exports = {
  eventsController: router,
};
