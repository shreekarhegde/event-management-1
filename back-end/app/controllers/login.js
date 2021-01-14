const express = require("express");
const router = express.Router();
const { con } = require("../../config/db");

router.get("/", (req, res) => {
  let { uName, password } = req.body;
  let findQuery = `SELECT * from users where first_name=${uName}`;
  con.query(findQuery, function (err, result) {
    if (err) res.send({ message: "Login failed", result: err });
    console.log("user fetched::", result);
    res.send({ message: "logged in successfully", result: result });
  });
});

module.exports = {
  loginController: router,
};
