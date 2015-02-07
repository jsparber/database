var express = require('express');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {};
	db.query("products", function(products){
		data.products = products;
  	res.render('index', {data: data});
	});
});

module.exports = router;
