var express = require('express');
var router = express.Router();
//socket.io用
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

/* GET処理 */
router.get('/', (req, res, next) => {
    var data = {
        title: 'ONLINE',
        msg: 'Hello'
    }
    res.render('online', data);
});

io.on('connection', function(socket) {
    console.log('connected');
});

module.exports = router;
