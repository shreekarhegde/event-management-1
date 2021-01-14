const { con } = require("../../config/db");
const { venue_db_keys } = require("../constants/db-keys");

function createVenueTable() {
  con.getConnection(function (err) {
    if (err) throw err;
    var sql = `CREATE TABLE IF NOT EXISTS venue 
    (name VARCHAR(255), 
    venueID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255),
    created_at TIMESTAMP
    )`;
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Venue Table created");
    });
  });
}

module.exports.createVenueTable = createVenueTable;
