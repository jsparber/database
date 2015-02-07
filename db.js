var mysql      = require('mysql');
var connection = mysql.createConnection({
	host     : '172.17.0.2',
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

//connection.query('CREATE TABLE products (id INT, name VARCHAR(20), description VARCHAR(400))');

/*connection.query('SHOW TABLES', function(err, row, data1) {
	if (err) throw err;
	console.log("First:", row);
//console.log("Second:", data1);
});
*/

connection.query('INSERT INTO products (id,name,description) VALUES(1,"Toy","A toy for a child")', function(err, data1) {
	if (err) throw err;
});

module.exports.query = function(request, callback, arg) { 
	switch (request) {
		case "products":
			connection.query('SELECT * FROM products', function(err, row) {
				if (err) throw err;
				callback(row);
			});
			break;
		case "search":
			connection.query('SELECT * FROM products WHERE name LIKE \'%' + arg+ '%\'', function(err, row) {
				if (err) throw err;
				callback(row);
				console.log("Result", row);
			});
			break;
	}
};


//connection.end();
