var express = require('express');
var router = express.Router();

/* GET CPU */
router.get('/', function(req, res, next) {
  res.render('cpu', {
    title: 'VS CPU' 
    });
});



module.exports = router;
