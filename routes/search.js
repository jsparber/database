var express = require('express');
var url = require('url');
var db = require('../db');
var router = express.Router();

/* GET search page. */
router.get('/', function(req, res) {
	var data = {};
	var query = url.parse(req.url, true).query.query;
	if(query) {
	console.log(query);
	db.query("search", function(products){
		data.products = products;
  	res.render('index', {data: data});
	}, query);
	}
	else
		console.log("Error: no query");
});

module.exports = router;
