const express = require("express");
const router = express.Router();
const { con } = require("../../config/db");

router.get("/", (req, res) => {
  let findQuery = `SELECT * FROM events 
  join venue on events.venueID = venue.venueID
  join users on users.userID = events.userID
  inner join payment on payment.userID = events.userID and payment.eventID = events.eventID`;
  con.query(findQuery, function (err, result) {
    if (err) {
      res.send({
        message: "Something went wrong. Could not fetch events",
        data: err,
        status: "fail",
      });
    } else {
      console.log("admin events fetched::", result);
      res.send({
        message: "All events fetched!",
        data: result,
        status: "success",
      });
    }
  });
});

module.exports = {
  adminController: router,
};
