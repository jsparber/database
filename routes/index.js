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
	var query = url.parse(req.url, true).query;
	var action = query.action || 'listProducts';
	var session = req.session;
	if(view[action] && view[action].action === 'createList') {
		db(action, function(err, data){
			if(err) console.error("Database Error:", err);
			var data = {data: view[action] || {},
				session: session || {},
				values: data || [],
				query: query
			};
			res.render('index', {data: data});
		}, query);
	}
	else {
		var data = {data: view[action] || {}, session: session || {}, query : query};
		res.render('index', {data: data});
	}
});

router.post('/job', function(req, res) {
	var action = url.parse(req.url, true).query.action;
	var session = req.session || {};
	console.log("Input", req.body);
	var values = req.body;
	values.IdUtente = req.session.userId;
	console.log(values);
	db(action, function(err, data){
		console.log("Result", data);
		if(err) {
			console.error("Database Error:", err);
			res.redirect('/?msg=' + err);
		}
		else {
		//	hander(action, function(err, data){
				res.redirect('/?msg=successful');
	//		});
		}
	}, values);
});

router.get('/login', function(req, res) {
	var data = {}
	//data.req = "products";
	data.loggedIn =	req.session.loggedIn;
	//res.render('index', {data: data});
	res.send("Pleas login");
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
