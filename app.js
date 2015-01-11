var express = require('express');
var app = express();
app.set('view engine', 'jsx');
var options = { jsx: { harmony: true } };
app.engine('jsx', require('express-react-views').createEngine(options));

app.get('/', require('./routes').index);

var server = app.listen(3000, function () {

	var host = server.address().address
	var port = server.address().port

	console.log('Example app listening at http://%s:%s', host, port)

})
