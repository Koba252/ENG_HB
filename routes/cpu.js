var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('engdic.sqlite3');

/* GET CPU */
router.get('/', function(req, res, next) {
    db.serialize(() => {
        db.all("SELECT * FROM items ORDER BY RANDOM() LIMIT 1", (err, rows) => {
            if(!err) {
                var data = {
                    title: 'VS CPU',
                    content: rows
                };
                res.render('cpu', data);
            }
        });
    });
});



module.exports = router;
