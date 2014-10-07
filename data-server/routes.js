var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.header('Content-Type', 'text/html; charset=utf-8');
  res.render('index', { title: 'D3 Data' });
});

module.exports = router;
