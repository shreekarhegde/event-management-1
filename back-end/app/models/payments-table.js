const { con } = require("../../config/db");

function createPaymentTable() {
  console.log("inside createPaymentTableFunction");
  con.getConnection(function (err) {
    if (err) throw err;
    var sql = `CREATE TABLE IF NOT EXISTS payment ( 
        paymentID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        userID int NOT NULL,
        eventID int NOT NULL,
        FOREIGN KEY (userID) REFERENCES users(userID),
        FOREIGN KEY (eventID) REFERENCES events(eventID),
        amount INT,
        result VARCHAR(10))
       `;
    con.query(sql, function (err, result) {
      console.log("event table created", result);
      if (err) throw err;
    });
  });
}

module.exports.createPaymentTable = createPaymentTable;
