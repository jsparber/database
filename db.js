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

	/*connection.query('DROP TABLE products', function(err, data1) {
		if (err && err.code != 'ER_TABLE_EXISTS_ERROR') {
			console.error(err);
		}
	});
	*/
	connection.query('CREATE TABLE users (user VARCHAR(200), mail VARCHAR(200), name VARCHAR(200), adress VARCHAR(200), phone VARCHAR(200))', function(err, data1) {
		if (err && err.code != 'ER_TABLE_EXISTS_ERROR') {
			console.error(err);
		}
	});
	connection.query('CREATE TABLE products (id MEDIUMINT NOT NULL AUTO_INCREMENT, name VARCHAR(200) NOT NULL, description VARCHAR(200) NOT NULL,  PRIMARY KEY (id))', function(err, data1) {
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

function jsonToSQL(head, json , id) {
	var str = "";
	var values = ""
		head.forEach(function(el, index) {
			if (index < head.length -1) {
				str += el + ', ';
				values += '"' + json[el] + '", ';
			}
			else {
				str += el;
				values += '"' + json[el] + '"';
			}
		});
	return('(' + str + ') VALUES(' + values + ')'); 
}

/*var connection = handleConnection();
var str = jsonToSQL(['name', 'description'], {'name' : 'Toy', 'description' : 'Child game'});
connection.query('INSERT INTO products ' + str, function(err, row) {
	if (err) console.error(err);
});
connection.query('SELECT * FROM products', function(err, row) {
	if (err) console.error(err);
	console.log(row);
});
connection.end();
*/

module.exports.products = function(action, callback, data) { 
	var connection = handleConnection();
	switch (action) {
		case "listAll":
			connection.query('SELECT * FROM products', function(err, row) {
				if (err) console.error(err);
			callback(row);
			});
			break;
		case "search":
			connection.query('SELECT * FROM products WHERE name LIKE \'%' + data.search+ '%\'', function(err, row) {
				if (err) console.error(err);
				callback(row);
			});
			break;
		case "add":
			connection.query('INSERT INTO products ' + jsonToSQL(['name', 'description'], data), function(err, row) {
				if (err) console.error(err);
				callback(row);
			});
			break;
	}
	connection.end();
};

module.exports.users = test = function(action, callback, data) { 
	var connection = handleConnection();
	switch (action) {
		case "add":
			connection.query('INSERT INTO users (user, e-mail, name, adress, phone)', function(err, row) {
				if (err) console.error(err);
				callback(row);
			});
			break;
		case "login":
			connection.query('SELECT user FROM users WHERE user = ' + data.user + ' & password = ' + data.password, function(err, row) {
				if (err) console.error(err);
				callback(row);
				console.log("Result", row);
			});
			break;
	}
	connection.end();
};

