var mysql      = require('mysql');

function handleConnection(db){
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

	connection.query('CREATE DATABASE asta', function(err, data) {
		if (err && err.code != 'ER_DB_CREATE_EXISTS') {
			console.error(err);
		}
	});
	
	connection.query('USE asta', function(err, data) {
		if (err) {
			console.error(err);
		}
		//console.log(data);
	});

	connection.query('CREATE TABLE users (user VARCHAR(200), mail VARCHAR(200), name VARCHAR(200), adress VARCHAR(200), phone VARCHAR(200))', function(err, data1) {
		if (err && err.code != 'ER_TABLE_EXISTS_ERROR') {
			console.error(err);
		}
	});
connection.query('CREATE TABLE products (id VARCHAR(200), name VARCHAR(200), description VARCHAR(200))', function(err, data1) {
		if (err && err.code != 'ER_TABLE_EXISTS_ERROR') {
			console.error(err);
		}
	});

	return connection;
}


/*connection.query('SHOW TABLES', function(err, row, data1) {
	if (err) throw err;
	console.log("First:", row);
//console.log("Second:", data1);
});
*/

/*connection.query('INSERT INTO products (id,name,description) VALUES(1,"Toy","A toy for a child")', function(err, data1) {
	if (err) throw err;
	});
	*/

module.exports.query = function(request, callback, arg) { 
	var connection = handleConnection();
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
	connection.end();
};

module.exports.user = test = function(action, callback, arg) { 
	var connection = handleConnection();
	switch (action) {
		case "add":
			connection.query('INSERT INTO users (user, e-mail, name, adress, phone)', function(err, row) {
				if (err) throw err;
				callback(row);
			});
			break;
		case "login":
			connection.query('SELECT user FROM users WHERE user = ' + data.user + ' & password = ' + data.password, function(err, row) {
				if (err) throw err;
				callback(row);
				console.log("Result", row);
			});
			break;
	}
	connection.end();
};

