const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// List boats based on swimlane status
// Inputs: Optional URI ending of integer based swimlane status: 0=Docked,1=Outbound,2=Inbound,3=Maintenance
// Returns: JSON list filtered based on swimlane status parameter, if none given, shows all boats
router.get('/list/:swimlane?', function(req, res, next) {
    if (req.params.swimlane != null && req.params.swimlane != '') {
        var boatslist = connection.query('SELECT * FROM boats WHERE swimlane=' + req.params.swimlane, function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        });
    } else {
        var boatslist = connection.query('SELECT * FROM boats', function (error, results, fields) {
            if (error) throw error;
            res.json(results);
        })
    }
});

// Adds a boat with default swimlane 0 (Docked)
//  Inputs: req.bodyboatname, req.body.operatorname -- **TODO: change this after building frontend
//  Returns: id of added boat
router.post('/addboat', function(req, res, next)
{
    var boat = req.body.vessel_name;
    var operator = req.body.operator_name;
    connection.query('INSERT INTO boats (vessel_name, operator_name, swimlane) VALUES (?,?,0)', [boat,operator], function(error, results){
        if (error) {
            res.sendStatus(400);
            return;
        }
        if (results.affectedRows == 0)
        {
           res.sendStatus(400);
           return;
        }
        res.send(results.insertId.toString());
        });

});

// Edit an existing boat Ex: /editboat/1
//  Input: id (via URL), req.body.boatname, req.body.operatorname
router.post('/editboat/:id', function(req, res) {
    var id = req.params.id;
    var vesselname = req.body.vessel_name;
    var operator = req.body.operator_name;
    var swimlane = req.body.swimlane;
    connection.query('UPDATE boats ' +
        'SET vessel_name=?, operator_name=?, swimlane=? ' +
        'WHERE id = ?', [vesselname, operator, swimlane, id], function(error, results) {
        if (error) {
            res.sendStatus(400);
            return;
        }
        if (results.affectedRows == 0)
        {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(200);
    });
});

// Delete an existing boat id Ex: /deleteboat/1
//  input: id (via URL)
router.delete('/deleteboat/:id', function(req,res) {
    var id = req.params.id;
    connection.query('DELETE FROM boats ' +
        'WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.sendStatus(400);
            return;
        }
        if (results.affectedRows == 0) {
            res.sendStatus(400);
            return;
        }
        res.sendStatus(200);
    })
});

module.exports = router;
