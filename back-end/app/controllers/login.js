const express = require("express");
const router = express.Router();
const { con } = require("../../config/db");

router.post("/", (req, res) => {
  let { uName, password } = req.body;
  let findQuery = `SELECT * from users where first_name='${uName}'`;
  con.query(findQuery, function (err, result) {
    if (err) {
      res.send({ message: "Login failed", data: err, status: "fail" });
    } else {
      console.log("user fetched::", result);
      res.send({
        message: "logged in successfully",
        data: result,
        status: "success",
      });
    }
  });
});

module.exports = {
  loginController: router,
};
