const { con } = require("../../config/db");
const { events_db_keys, venue_db_keys } = require("../constants/db-keys");

function createEventsTable() {
  console.log("inside createEventsTableFunction");
  con.getConnection(function (err) {
    if (err) throw err;
    var sql = `(eventName VARCHAR(255), 
            eventID int NOT NULL AUTO_INCREMENT PRIMARY KEY,
            userID int,
            venueID int,
            FOREIGN KEY (userID) REFERENCES users(userID),
            FOREIGN KEY (venueID) REFERENCES venue(venueID),
            starts_at TIMESTAMP, 
            ends_at TIMESTAMP,
            created_at TIMESTAMP)`;
    con.query(sql, function (err, result) {
      console.log("event table created", result);
      if (err) throw err;
    });
  });
}

module.exports.createEventsTable = createEventsTable;
