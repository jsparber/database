var express = require('express');
var sql = require('./db.js');
var app = express();

	app.get('/', function (req, res) {
		  res.send('Hello World!')
	})

console.log(sql);
console.log(app);
var server = app.listen(3000, function () {

	  var host = server.address().address
			  var port = server.address().port

				  console.log('Example app listening at http://%s:%s', host, port)

})
