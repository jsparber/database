var express = require('express');
var url = require('url');
var cookie = require('cookie-parser');
var db = require('../db'); //db(action, callback, data);
var router = express.Router();
var view = require('../views');
var preAction = require('../preAction');
//var handler = require('../handler');

/* GET home page. */
router.get('/', function(req, res) {
	//get url argoments
	var query = url.parse(req.url, true).query;
	query.action = query.action || 'listProducts';
	var action = query.action;
	var session = req.session;
		console.log("My query", query);
	if (view[action] && view[action].preAction) {
		preAction[view[action].preAction](function(err, dbData) {
			if(err) console.error("Database Error:", err);
			//console.log(dbData);	
			view[action].dbData = dbData;
			var data = {data: view[action] || {},
				session: session || {},
				values: dbData || [],
				query: query
			};
			res.render('index', {data: data});
		}, session, query);
	}
	else {
		view[action].dbData = {};
		var data = {data: view[action] || {}, session: session || {}, query : query};
		res.render('index', {data: data});
	}
});

router.post('/job', function(req, res) {
	var action = url.parse(req.url, true).query.action;
	var session = req.session || {};
	//console.log("Files: ", req);
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

router.get('/search', function(request, response){
	var query = url.parse(request.url).query;
	response.redirect('/?action=search&' + query);
});


router.post('/login', function(req, res) {
	db('login', function(err, data) {
		console.log("My scret data", data);
		if(err || data.length === 0)
			res.redirect('/?msg=Wrong login');
		else {
			console.log("My data", data);
			req.session.user = req.body.Username.substring(1, req.body.Username.length - 1);
			req.session.userId = data[0].Utente;
			res.redirect('/');
		}
	}, req.body);

});

module.exports = router;
