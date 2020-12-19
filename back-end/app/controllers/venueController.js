const express = require("express");
const { venue_db_keys } = require("../constants/db-keys");
const router = express.Router();
const { con } = require("../../config/db");
const { createVenueTable } = require("../models/venue-table");

router.post("/", (req, res) => {
  createVenueTable();
  let { name, address } = req.body;
  let created_at = new Date().toISOString().slice(0, 19).replace("T", " ");
  const insertQuery = `INSERT INTO venue (
        ${venue_db_keys.name},
        ${venue_db_keys.address},
        ${venue_db_keys.created_at}
    ) VALUES ("${name}","${address}","${created_at}")`;
  con.query(insertQuery, function (err, result) {
    console.log("error in venue creation", err);
    if (err) throw err;
    console.log("venue created::", result);
    res.send({ message: "Created venue", result: result });
  });
});

router.get("/:id", (req, res) => {
  let id = req.params.id;
  con.query(
    `SELECT * FROM venue WHERE ${venue_db_keys.venueID} = ${id}`,
    function (err, result) {
      if (err) throw err;
      console.log("venue fetched::", result);
      res.send({ message: "Found venue", result: result });
    }
  );
});

router.get("/", (req, res) => {
  con.query(`SELECT * FROM venue`, function (err, result) {
    if (err) throw err;
    console.log("venue fetched::", result);
    res.send({ message: "All venues found!", result: result });
  });
});

module.exports = {
  venueController: router,
};
