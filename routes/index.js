var express = require('express');
var url = require('url');
var cookie = require('cookie-parser');
var db = require('../db');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {};
	data.req = "products";
	db.products("listAll", function(products){
		data.products = products;
		data.loggedIn = req.session.loggedIn;
		console.log("Destroid session", req.session);
		console.log("Cookies: ", req.cookies)
			res.render('index', {data: data});
	});
});

router.get('/form', function(req, res) {
	var data = {forms: [
		["Product", "name", "description", "Tag"]
	]};
	data.loggedIn = req.session.loggedIn;
	data.req = "form";
	res.render('index', {data: data});
});



router.get('/login', function(req, res) {
	var data = {}
	//data.req = "products";
	data.loggedIn =	req.session.loggedIn;
	res.render('index', {data: data});
});


router.get('/search', function(req, res) {
	var data = {};
	var query = url.parse(req.url, true).query.query;
	if(query) {
		db.products("search", function(products){
			data.products = products;
			data.loggedIn = req.session.loggedIn;
			data.req = "products";
			res.render('index', {data: data});
		}, {search: query});
	}
	else
		console.log("Error: no query");
});

function restrict(req, res, next) {
	if (req.session.user) {
		next();
	} else {
		req.session.error = 'Access denied!';
		res.redirect('/login');
	}
}

router.get('/restricted', restrict, function(request, response){
	response.send('This is the restricted area! Hello ' + request.session.user + '! click <a href="/logout">here to logout</a>' + '<p>click <a href="/">here to go back</a></p>');
});

router.get('/logout', function(request, response){
	request.session.destroy(function(){
		response.redirect('/');
	});
});

router.post('/login', function(req, res) {
	if(req.body.user == "julian" && req.body.password == "test"){
		req.session.loggedIn = true;
		req.session.user = "julian"
	}
	res.redirect('/restricted');

});

router.post('/form', function(req, res) {
	db.products("add", function(products){
		console.log(products);

	}, req.body);
});


module.exports = router;
