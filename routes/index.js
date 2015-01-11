var sql = require('../db.js');
var data = {"name": "Julian"}; 

exports.index = function(req, res){
	  //res.render('index', data);
		//console.log(sql.query);
		console.log("New Request");
		sql.query(function(raw) {res.render('index', raw[0])});
};
