var mysql      = require('mysql');
const fs = require("fs");
if (process.env.NODE_ENV === 'development') {
    var connection = mysql.createPool({
        host: 'localhost',
        user: 'swimlane',
        password: 'passw0rd',
        database: 'swimlane',
        multipleStatements: true
    });
    connection.query(fs.readFileSync("config/init.sql").toString(), function(err, res) {
        if (err === null)
            console.log("Database initialized successfully.");
        else
        {
            console.log("Database failed to init...")
        }
    })
}
else {
    var connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'swimlane',
        multipleStatements: true
    });
    connection.query(fs.readFileSync("config/init.sql").toString(), function(err, res) {
        if (err === null)
            console.log("Database initialized successfully.");
        else
        {
            console.log("Database failed to init...");
            console.log(process.env.MYSQL_HOST);
            console.log(process.env.MYSQL_USER);
        }
    })

}
module.exports = connection;