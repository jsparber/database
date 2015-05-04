var mysql      = require('mysql');

function handleConnection(){
	var connection = mysql.createConnection({
		host     : '172.17.0.3',
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

/*module.exports.products = function(action, callback, data) { 
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
	*/

module.exports = function(action, callback, data) { 
	var connection = handleConnection();
	switch (action) {
		case "addUser":
			transaction(connection, ['INSERT INTO `piattaforma`.`Utente` ' + jsonToSQL(['E-mail', 'Nome', 'Cognome', 'Residenza', 'IndirizzoSpedizione'], data), 
					'INSERT INTO `piattaforma`.`Credenziali` (`Utente`, `Password`, `Username`) VALUES (LAST_INSERT_ID(), "' + data.Password + '", "' + data.Username + '")'],
					function(err, row) {
						//if (err.code == 'ER_DUP_ENTRY') 
						connection.end();
						callback(err, row);
					});
			break;
			/*case "addProduct":
				connection.query(''
			//Same as addUser
			, function(err, row) {});
			break;
			*/
		case "bid": //to check add now() for Data;
			connection.query('INSERT INTO `piattaforma`.`Offerta`' + 
					jsonToSQL(['Utente', 'Importo', 'Data', 'Prodotto']), function(err, row) {
						if (err) console.error(err ,row);
						connection.end();
						console.log(row);
					});
			break;
		case "addFeedback":
			connection.query('INSERT INTO `piattaforma`.`Feedback` ' + 
					jsonToSQL(['Utente', 'Autore', 'Contenuto', 'Valutazione'], data), function(err, row) {
						//if (err) console.error(err ,row);
						connection.end();
						console.log(err, row);
					});
			break;
		case "changeUserProfile":
			connection.query('UPDATE `piattaforma`.`Utente` E-mail="' + data.E-mail + '", ' + 
					'Nome="' + data.Nome + '", ' + 
					'Cognome="' + data.Cognome + '", ' + 
					'Residenza="' + data.Residezna + '", ' +
					'IndirizzoSpedizione="' + data.Spedizione + '" WHERE idUtente="' + data.idUtente + '"',
					function(err, row) {
						if (err) console.error(err ,row);
						connection.end();
						console.log(row);
					});
			break;
		case "changeCredential":
			connection.query('UPDATE `piattaforma`.`Credenziali` Password="' + data.Password + '", ' + 
					'Username="' + data.Username + '" WHERE idUtente="' + data.idUtente + '"',
					function(err, row) {
						if (err) console.error(err ,row);
						connection.end();
						console.log(row);
					});
			break;
		case "login":
			connection.query('SELECT user FROM users WHERE user = ' + data.user + ' & password = ' + data.password, function(err, row) {
				if (err) console.error(err);
				callback(row);
				connection.end();
				console.log("Result", row);
			});
			break;
		default:
			callback("worng action");
			connection.end();
	}
	//connection.end();
};

//utility to parse json to inserts (columns) and (values)
function jsonToSQL(head, json) {
	var str = "";
	var values = ""
		head.forEach(function(el, index) {
			if (index < head.length -1) {
				str += '`' + el + '`, ';
				values += '"' + json[el] + '", ';
			}
			else {
				str += '`' + el + '`';
				values += '"' + json[el] + '"';
			}
		});
	return('(' + str + ') VALUES(' + values + ')'); 
}

function transaction(connection, queryList, callback) {
	connection.beginTransaction(function(err) {
		if (err) { 
			callback(err);
		}
		for (var i = 0; i < queryList.length; i++) {
			if (i === queryList.length - 1) {
				connection.query(queryList[i], function(err, result) {
					if (err) { 
						connection.rollback(function() {
							callback(err);
						});
					}
					else {
					connection.commit(function(err) {
						console.log(data);
						if (err) { 
							connection.rollback(function() {
								callback(err);
							});
						}
						else
							callback(null, 'success!');
					});
					}
				});
			}
			else {
				connection.query(queryList[i], function(err, result) {
					if (err) { 
						connection.rollback(function() {
							callback(err);
						});
					}
				});
			}
		}
	});
}
