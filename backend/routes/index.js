var express = require('express');
var router = express.Router();
var connection = require('../config/database');

/* GET home page. */
//This may be used for manual testing
router.get('/', function(req, res, next) {
    res.render('index');
});

module.exports = router;
