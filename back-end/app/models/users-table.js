const { con } = require('../../config/db');

function createUserTable(){
     con.getConnection(function(err) {
        if (err) throw err;
        var sql = `  
        CREATE TABLE IF NOT EXISTS users 
          (id VARCHAR(255) NOT NULL PRIMARY KEY, 
          first_name VARCHAR(255), 
          last_name VARCHAR(255), 
          role VARCHAR(255), 
          ph_num INT(10),
          created_at TIMESTAMP);
        `
        con.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Users Table created");
        });
      });
}

module.exports.createUserTable = createUserTable;
