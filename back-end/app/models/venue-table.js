const { con } = require('../../config/db');
const { venue_db_keys } = require('../constants/db-keys');

function createVenueTable(){
  con.getConnection(function(err) {
    if (err) throw err;
    var sql = `CREATE TABLE IF NOT EXISTS venue 
        (${venue_db_keys.name} VARCHAR(255), 
        ${venue_db_keys.id} int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        ${venue_db_keys.address} VARCHAR(255),
        ${venue_db_keys.created_at} TIMESTAMP
        )`;
        con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Venue Table created");
    });
  });
}

module.exports.createVenueTable = createVenueTable;