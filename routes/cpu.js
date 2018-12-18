var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('engdic.sqlite3');

/* GET CPU */
router.get('/', (req, res, next) => {
    db.serialize(() => {
        db.get("SELECT * FROM items ORDER BY RANDOM()", (err, rows) => {
            console.log(rows);
            var ans = rows.word;
            var ansAry = ans.split('');
            req.session.answer = ansAry;
            console.log(req.session.answer);
            req.session.prediction = [];
            if(!err) {
                var data = {
                    title: 'VS CPU',
                    content: []
                };
                res.render('cpu', data);
            }
        });
    });
});

router.post('/post', (req, res, next) => {
    console.log(req.session.answer);
    var pre = req.body['predict'];
    var preAry = pre.split('');
    console.log(preAry);
    req.session.prediction.push(pre);
    console.log(req.session.prediction);
    var data = {
        title: 'TEST',
        content: req.session.prediction
    }
    res.render('cpu', data);
});



module.exports = router;
