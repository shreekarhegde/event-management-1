const { con } = require('../../config/db');
const { events_db_keys } = require('../constants/db-keys');

function createEventsTable(){
  console.log('inside createEventsTableFunction');
  con.getConnection(function(err) {
    if (err) throw err;
    var sql = `CREATE TABLE IF NOT EXISTS events 
        (${events_db_keys.name} VARCHAR(255), 
        ${events_db_keys.id} int NOT NULL AUTO_INCREMENT PRIMARY KEY,
        FOREIGN KEY (${events_db_keys.id}) REFERENCES venue(${events_db_keys.id}),
        ${events_db_keys.starts_at} TIMESTAMP, 
        ${events_db_keys.ends_at} TIMESTAMP)`;
        con.query(sql, function (err, result) {
          console.log('event table created', result);
          if (err) throw err;
    });
  });
}

module.exports.createEventsTable = createEventsTable;