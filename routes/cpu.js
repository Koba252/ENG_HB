var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database('engdic.sqlite3');

// GET処理
router.get('/', (req, res, next) => {
    db.serialize(() => {
        db.get("SELECT * FROM items ORDER BY RANDOM()", (err, rows) => {
            console.log(rows);
            var ans = rows.word;
            var ansAry = ans.split('');
            req.session.answer = ansAry;
            console.log(req.session.answer);
            req.session.prediction = [];
            req.session.hit = [];
            req.session.blow = [];
            if(!err) {
                var data = {
                    msg: 'Ready to Start',
                    content: []
                };
                res.render('cpu', data);
            }
        });
    });
});

// POST処理
router.post('/post', (req, res, next) => {
    var ansAry = req.session.answer;
    console.log(ansAry);
    var pre = req.body['predict'];
    var preAry = pre.split('');
    console.log(preAry);
    
    for (var i = 0; i < ansAry.length; i++) {
        for (var j = i + 1; j < ansAry.length; j++) {
            if (preAry[i] == preAry[j]) {
                console.log('The same word is used!');
                var data = {
                    msg: 'You cannot use the same letters at once.',
                    content: req.session.prediction,
                    content2: req.session.hit,
                    content3: req.session.blow
                }
                res.render('cpu', data);
                return false;
            } else {
                console.log('No Problem');
            }
        }
    }

    req.session.prediction.push(pre);
    console.log(req.session.prediction);

    //hit, blow数確認
    var hit = 0;
    var blow = 0;
    for (var i = 0; i < preAry.length; i++) {
        if (ansAry[i] == preAry[i]){
            hit += 1;
        }
    }
    for (var i = 0; i < preAry.length; i++) {
        for (var j = 0; j < preAry.length; j++) {
            if (ansAry[i] == preAry[j]) {
                blow += 1;
            }
        }
    }
    blow -= hit;

    if (hit != preAry.length) {
        req.session.hit.push(hit);
        req.session.blow.push(blow);
    } else {
        //CLEAR処理
        req.session.hit.push(hit);
        req.session.blow.push(blow);
        var data = {
            msg: 'CLEAR!',
            content: req.session.prediction,
            content2: req.session.hit,
            content3: req.session.blow
        }
        res.render('cpu', data);
        delete req.session.prediction;
        delete req.session.hit;
        delete req.session.blow;
        return false;
    }

    console.log(req.session.hit);
    console.log(req.session.blow);

    var data = {
        msg: 'Please input a predicting word. ',
        content: req.session.prediction,
        content2: req.session.hit,
        content3: req.session.blow
    }
    res.render('cpu', data);
});



module.exports = router;
