var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
// Display simple message about what the user has reached.
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
