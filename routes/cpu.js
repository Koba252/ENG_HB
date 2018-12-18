var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('engdic.sqlite3');

/* GET CPU */
router.get('/', (req, res, next) => {
    db.serialize(() => {
        db.get("SELECT * FROM items ORDER BY RANDOM()", (err, rows) => {
            console.log(rows);
            req.session.answer = rows.word;
            if(!err) {
                var data = {
                    title: 'VS CPU',
                    content: 'null'
                };
                res.render('cpu', data);
            }
        });
    });
});

router.post('/', (req, res, next) => {
    var data = {
        title: 'TEST',
        content: req.session.answer
    }
    res.render('cpu', data);
});



module.exports = router;
