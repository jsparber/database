var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	
	db.query("products", function(products){
  	res.render('form', {data: data});
	});
});

module.exports = router;
