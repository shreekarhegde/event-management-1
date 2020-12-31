const express = require("express");
const { events_db_keys } = require("../constants/db-keys");
const router = express.Router();
const { con } = require("../../config/db");

router.post("/", (req, res) => {
  console.log('req body--->', req.body)
  let { eventName, venueID, starts_at, ends_at, userID, paymentID, role, created_at } = req.body;
  if (role === "student" && !paymentID) {
    res.send({ error: "Please complete payment before registration." });
    return;
  }
  const insertQuery = `INSERT INTO events (
        ${events_db_keys.eventName},
        ${events_db_keys.venueID},
        ${events_db_keys.userID},
        ${events_db_keys.starts_at},
        ${events_db_keys.ends_at},
        ${events_db_keys.created_at}
    ) VALUES ("${eventName}","${venueID}","${userID}","${starts_at}","${ends_at}","${created_at}")`;

  con.query(insertQuery, function (err, result) {
    console.log("error in events creation", err);
    if (err) throw err;
    console.log("event created::", result);
    res.send({ message: "Created event", result: result });
  });
});

router.get('/latest', (req, res) => {
  con.query(`SELECT * FROM events
    WHERE DATE_ADD(created_at, INTERVAL 10 second) >= NOW();`, function (err, result) {
    if (err) throw err;
    console.log("events fetched::--->", result);
    res.send({ message: "Latest events", result: result });
  });
})

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
