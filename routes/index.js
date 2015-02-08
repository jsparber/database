var express = require('express');
var url = require('url');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {};
	db.query("products", function(products){
		data.products = products;
		res.render('index', {req: "products", data: data});
	});
});

router.get('/form', function(req, res) {
	var data = [
	["Product ID", "Product Name", "Description", "Tag"]
	];
		res.render('index', {req: "form", data: data});
});

router.get('/search', function(req, res) {
	var data = {};
	var query = url.parse(req.url, true).query.query;
	if(query) {
	console.log(query);
	db.query("search", function(products){
		data.products = products;
  	res.render('index', {req: "products", data: data});
	}, query);
	}
	else
		console.log("Error: no query");
});

module.exports = router;
