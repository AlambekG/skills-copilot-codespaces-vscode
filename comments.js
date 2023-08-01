// Create web server with nodejs

// Import modules
var express = require('express');
var router = express.Router();
var db = require('../db');

// GET /comments
router.get('/', function(req, res, next) {
    var query = 'SELECT * FROM comments ORDER BY id DESC';
    db.query(query, function(err, rows, fields) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(rows);
        }
    });
});

// POST /comments
router.post('/', function(req, res, next) {
    var query = 'INSERT INTO comments (author, text) VALUES (?, ?)';
    db.query(query, [req.body.author, req.body.text], function(err, result) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

// DELETE /comments
router.delete('/:id', function(req, res, next) {
    var query = 'DELETE FROM comments WHERE id = ?';
    db.query(query, [req.params.id], function(err, result) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json(result);
        }
    });
});

module.exports = router;