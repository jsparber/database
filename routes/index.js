var express = require('express');
var url = require('url');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {};
	data.req = "products";
	db.query("products", function(products){
		data.products = products;
		res.render('index', {data: data});
	});
});

router.get('/form', function(req, res) {
	var data = {forms: [
	["Product ID", "Product Name", "Description", "Tag"]
	]};
	data.req = "form";
		res.render('index', {data: data});
});

router.get('/search', function(req, res) {
	var data = {};
	var query = url.parse(req.url, true).query.query;
	if(query) {
	db.query("search", function(products){
		data.products = products;
		data.req = "products";
  	res.render('index', {data: data});
	}, query);
	}
	else
		console.log("Error: no query");
});

module.exports = router;
