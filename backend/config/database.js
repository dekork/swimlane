var mysql      = require('mysql');
const fs = require("fs");
if (process.env.NODE_ENV === 'development') {
    var tempconnection = mysql.createConnection({
        host: 'localhost',
        user: 'swimlane',
        password: 'passw0rd',
        multipleStatements: true
    });
    tempconnection.query(fs.readFileSync("config/init.sql").toString(), function(err, res) {
        if (err === null)
            console.log("Database initialized successfully.");
        else
        {
            console.log("Database failed to init...");
            console.log(err);
        }
    })
    tempconnection.end(function(err){
        console.log('Finishing database init. Errors:' + (err) ? err : "None.");
    });
    var connection = mysql.createPool({
        host: 'localhost',
        user: 'swimlane',
        password: 'passw0rd',
        database: 'swimlane',
        multipleStatements: true
    });
}
else {
    console.log("Initializing db using production DB: " + process.env.MYSQL_USER + " @ " + process.env.MYSQL_HOST)
    var tempconnection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        multipleStatements: true
    });
    tempconnection.query(fs.readFileSync("config/init.sql").toString(), function(err, res) {
        if (err === null)
            console.log("Database initialized successfully.");
        else
        {
            console.log("Database failed to init...");
            console.log(err);
        }
    })
    tempconnection.end(function(err){
        console.log('Finishing database init.');
    });

    var connection = mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'swimlane',
        multipleStatements: true
    });


}
module.exports = connection;