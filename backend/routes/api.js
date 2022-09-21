const express = require('express');
const router = express.Router();
const connection = require('../config/database');

// [GET] /api/list/ OR /api/list/{ID}
// List boats based on swimlane status
// Inputs: {Path parameter} ID - Integer based swimlane status (0=Docked,1=Outbound,2=Inbound,3=Maintenance)
// Returns: JSON list filtered based on swimlane status parameter, if none given, shows all boats
router.get('/list/:swimlane?', function(req, res, next) {
    if (req.params.swimlane != null && req.params.swimlane != '') {
        connection.query('SELECT * FROM boats WHERE swimlane=' + req.params.swimlane, function (error, results) {
            if (error) {
                res.sendStatus(500);
                return;
            }
            res.json(results);
        });
    } else {
        connection.query('SELECT * FROM boats', function (error, results) {
            if (error) {
                res.sendStatus(500);
                return;
            }
            res.json(results);
        })
    }
});

// [POST] /api/addboat
// Adds a boat with default swimlane 0 (Docked)
//  Inputs: [Request body] req.body.boatname - The name of the boat to be added.
//          [Request body] req.body.operatorname - The name of the operator of the boat to be added.
//  Returns: Integer id of added boat, or 400 error code if adding was unsuccessful.
router.post('/addboat', function(req, res, next)
{
    let boat = req.body.vessel_name;
    let operator = req.body.operator_name;
    connection.query('INSERT INTO boats (vessel_name, operator_name, swimlane) VALUES (?,?,0)', [boat,operator], function(error, results){
        if (error) {
            res.sendStatus(500);
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

// [POST] /api/editboat/{ID}
// Edit an existing boat Ex: /editboat/1
//  Inputs: {Path parameter} ID - ID of the boat to be edited.
//          [Request body] req.body.boatname - edited boat name value to save.
//          [Request body] req.body.operatorname - edited operator name value to save.
// Returns: HTTP code 200 if edit was sucessful, otherwise 400 if it fails.
router.post('/editboat/:id', function(req, res) {
    let id = req.params.id;
    let vesselName = req.body.vessel_name;
    let operator = req.body.operator_name;
    let swimlane = req.body.swimlane;
    connection.query('UPDATE boats ' +
        'SET vessel_name=?, operator_name=?, swimlane=? ' +
        'WHERE id = ?', [vesselName, operator, swimlane, id], function(error, results) {
        if (error) {
            res.sendStatus(500);
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

// [DELETE] /api/deleteboat/[ID]
// Inputs: {Path parameter} id - ID of the boat to be deleted
// Returns: Status code 200 if deletion is successful, otherwise 400 if boat not found.
router.delete('/deleteboat/:id', function(req,res) {
    let id = req.params.id;
    connection.query('DELETE FROM boats ' +
        'WHERE id = ?', [id], function (error, results) {
        if (error) {
            res.sendStatus(500);
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
