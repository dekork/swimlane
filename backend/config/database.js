var mysql      = require('mysql');
if (process.env.NODE_ENV === 'development') {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'swimlane',
        password: 'passw0rd',
        database: 'swimlane'
    });
}
else {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: 'swimlane'
    });
}
module.exports = connection;