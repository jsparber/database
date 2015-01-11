var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : '172.17.0.6',
	user     : 'root',
	password : 'mysecretpassword'
});

connection.connect(function(err) {
	if (err) {
		console.error('error connecting: ' + err.stack);
		return;
	}

	console.log('connected as id ' + connection.threadId);
});

connection.query('USE books', function(err, data) {
	if (err) throw err;
	//console.log(data);
});


//connection.query('CREATE TABLE authors (id INT, name VARCHAR(20), email VARCHAR(20))');//, function(err, data, data1, data2) {

connection.query('SHOW TABLES', function(err, row, data1) {
	if (err) throw err;
	console.log("First:", row);
	//console.log("Second:", data1);
});

connection.query('INSERT INTO authors (id,name,email) VALUES(1,"Vivek","xuz@abc.com")', function(err, data1) {
	if (err) throw err;
	//console.log("Second:", data1);
	//console.log("First:", row);
});

module.exports.query = function(callback) { 
	connection.query('SELECT * FROM authors', function(err, row, data1) {
		if (err) throw err;
		callback(row);
	});
};


//connection.end();
