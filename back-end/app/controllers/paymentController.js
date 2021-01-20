const express = require("express");
const { payment_db_keys } = require("../constants/db-keys");
const router = express.Router();
const { con } = require("../../config/db");

router.post("/", (req, res) => {
  let { eventID, userID, amount } = req.body;
  let result = "success";
  const insertQuery = `INSERT INTO payment (
        ${payment_db_keys.eventID},
        ${payment_db_keys.userID},
        ${payment_db_keys.amount},
        ${payment_db_keys.result}
    ) VALUES ("${eventID}","${userID}","${amount}","${result}")`;

  con.query(insertQuery, function (err, result) {
    console.log("error in payment creation", err);
    if (err) {
      res.send({ result: "fail", data: err });
    } else {
      console.log("payment created::", result);
      res.send({ message: "payment successful", result: result });
    }
  });
});

router.get("/:id", (req, res) => {
  let paymentID = req.params.id;
  con.query(
    `SELECT * FROM payment WHERE ${events_db_keys.paymentID} = ${paymentID}`,
    function (err, result) {
      if (err) {
        res.send({ result: "fail", data: err });
      } else {
        console.log("payment fetched::", result);
        res.send({ message: "Found payment", result: result });
      }
    }
  );
});

router.get("/", (req, res) => {
  con.query(`SELECT * FROM payment`, function (err, result) {
    if (err) {
      res.send({ result: "fail", data: err });
    } else {
      console.log("payment fetched::", result);
      res.send({ message: "All payments found!", result: result });
    }
  });
});

module.exports = {
  paymentsController: router,
};
