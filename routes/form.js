var express = require('express');
var url = require('url');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	// first element is table name
	var query = url.parse(req.url, true).query;
	var data = [
	["Product ID", "Product Name", "Description", "Tag"]
	];
	db.query("products", function(products){
  	res.render('form', {data: data});
	});
});

module.exports = router;
