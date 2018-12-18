var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('engdic.sqlite3');

/* GET CPU */
router.get('/', function(req, res, next) {
    db.serialize(() => {
        db.get("SELECT * FROM items ORDER BY RANDOM()", (err, rows) => {
            console.log(rows);
            if(!err) {
                var data = {
                    title: 'VS CPU',
                    ans: rows.word
                };
                res.render('cpu', data);
            }
        });
    });
});



module.exports = router;
