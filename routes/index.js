var express = require('express');
var url = require('url');
var cookie = require('cookie-parser');
var db = require('../db'); //db(action, callback, data);
var router = express.Router();
var view = require('../views');
//var handler = require('../handler');

/* GET home page. */
router.get('/', function(req, res) {
	//get url argoments
	var action = url.parse(req.url, true).query.action || 'listProducts';
	var msg = url.parse(req.url, true).query.msg || '';
	var session = req.session;
	if(view[action] && view[action].action === 'createList') {
		db(action, function(err, data){
			if(err) console.error("Database Error:", err);
			var data = {data: view[action] || {},
				session: session || {},
				values: data || {},
				msg : msg || {}
			};
			res.render('index', {data: data});
		});
	}
	else {
		var data = {data: view[action] || {}, session: session || {}};
		res.render('index', {data: data});
	}
});

router.post('/job', function(req, res) {
	var action = url.parse(req.url, true).query.action
	var session = req.session || {};
	db(action, function(err, data){
		if(err) {
			console.error("Database Error:", err);
			res.redirect('/?msg=' + err);
		}
		else {
			hander(action, function(err, data){
				res.redirect('/?msg=successful');
			});
		}
	}, req.body);
});

router.post('/form', function(req, res) {
	db.products("add", function(products){
		console.log(products);
		res.redirect('/restricted');
	}, req.body);
});



router.get('/login', function(req, res) {
	var data = {}
	//data.req = "products";
	data.loggedIn =	req.session.loggedIn;
	//res.render('index', {data: data});
	res.send("Pleas login");
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
	db('login', function(err, data) {
		console.log("My scret data", data);
		if(err || data.length === 0)
			res.send(err);
		else {
			console.log("My data", data);
			req.session.user = req.body.Username;
			req.session.userId = data[0].Utente;
			res.redirect('/');
		}
	}, req.body);

});

module.exports = router;
