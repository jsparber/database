var mysql      = require('mysql');

function handleConnection(){
	var connection = mysql.createConnection({
		host     : '172.17.0.1',
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
	return connection;
}

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

module.exports.users = function(action, callback, data) { 
	var connection = handleConnection();
	switch (action) {
		case "add":
			connection.query('BEGIN; ' + 
					'INSERT INTO `piattaforma`.`Utente` ' + jsonToSQL(['E-mail', 'Nome', 'Cognome', 'Residenza', 'IndirizzoSpedizione'], data) + ' ; ' +
					'INSERT INTO `piattaforma`.`Credenziali` (`Utente`, `Password`, `Username`) VALUES (LAST_INSERT_ID(), ' + data.Password + ', ' + data.Username + '); ' +  //could not use jsonToSQL
					'COMMIT;', function(err, row) {
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

//utility to parse json to inserts (columns) and (values)
function jsonToSQL(head, json) {
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
