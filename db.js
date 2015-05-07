var mysql      = require('mysql');

function handleConnection(){
	var connection = mysql.createConnection({
		host     : '172.17.0.1',
		user     : 'root',
		password : 'mysecretpassword',
		database : 'piattaforma'
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

//should always use jsonToSQL would be also value check
module.exports = function(action, callback, data) { 
	var connection = handleConnection();
	data = escapeInput(connection, data);
	switch (action) {
		case "addUser":
			transaction(connection, ['INSERT INTO `piattaforma`.`Utente` ' + jsonToSQL(['E-mail', 'Nome', 'Cognome', 'Residenza', 'IndirizzoSpedizione'], data), 
					'INSERT INTO `piattaforma`.`Credenziali` (`Utente`, `Password`, `Username`) VALUES ($LAST_INSERT_ID, ' + data.Password + ', ' + data.Username + ')'],
						function(err, row) {
							//if (err.code == 'ER_DUP_ENTRY') 
							connection.end();
							callback(err, row);
						});
					break;
					case "addFeedback":
					connection.query('INSERT INTO `piattaforma`.`Feedback` ' + 
						jsonToSQL(['Utente', 'Autore', 'Contenuto', 'Valutazione'], data), function(err, row) {
							connection.end();
							callback(err, row);
						});
					break;
					case "changeUserProfile":
					connection.query('UPDATE `piattaforma`.`Utente` SET `E-mail` = ' + data['E-mail'] + ', ' + 
						'`Nome` = ' + data.Nome + ', ' + 
						'`Cognome` = ' + data.Cognome + ', ' + 
						'`Residenza` = ' + data.Residenza + ', ' +
						'`IndirizzoSpedizione` = ' + data.IndirizzoSpedizione + ' WHERE idUtente=' + data.idUtente,
						function(err, row) {
							connection.end();
							callback(err, row);
						});
					break;
					case "changeCredential":
					connection.query('UPDATE `piattaforma`.`Credenziali` SET Password=' + data.Password + ', ' + 
							'Username=' + data.Username + ' WHERE Utente=' + data.idUtente,
							function(err, row) {
								connection.end();
								callback(err, row);
							});
					break;
					case "login":
					connection.query('SELECT Utente FROM `piattaforma`.`Credenziali` WHERE Username = ' + data.Username + 
							' AND Password = ' + data.Password, function(err, row) {
								connection.end();
								callback(err, row);
							});
					break;
					case "addProduct": 
					data.Data = "NOW()";
					data.Proprietario = data.IdUtente;
					console.log(data);
					if (parseInt(data.Stato) == 1)
						var productTypeList = 'INSERT INTO `piattaforma`.`Asta` (`Prodotto`, `Scadenza`, `PrezzoPartenza`, `PrezzoRiserva`) VALUES ($LAST_INSERT_ID, NOW() , ' + data.PrezzoPartenza + ', ' + data.PrezzoRiserva + ');';
					else if (parseInt(data.Stato) == 2)
						var productTypeList = 'INSERT INTO `piattaforma`.`VenditaDiretta` (`Prodotto`, `Prezzo`) VALUES ($LAST_INSERT_ID, ' + data.Prezzo + ')';
								transaction(connection, ['INSERT INTO `piattaforma`.`Prodotto` ' + 
									jsonToSQL(['Nome', 'Descrizione', 'Foto', 'Data', 'Prezzo', 'Categoria',
										'Sottocategoria', 'Proprietario', 'Stato'], data),
									'INSERT INTO `piattaforma`.`Pagamento` (`Prodotto`, `Metodo`) VALUES ($LAST_INSERT_ID, ' +
										data.PagamentoMetodo + ')',
										'INSERT INTO `piattaforma`.`Spedizone` (`Nome`, `Descrizione`, `TempoConsegna`, `Importo`, `Prodotto`) VALUES (' +
											data.SpedizioneNome +', ' + data.SpedizioneDescrizione + ', ' + 
											data.SpedizioneTempoConsegna +', ' +
											data.SpedizioneImporto + ', $LAST_INSERT_ID);',
										productTypeList],
										function(err, row) {
											connection.end();
											callback(err, row);
										});
									break;
									case "bid": 
									connection.query('INSERT INTO `piattaforma`.`Offerta` (`Utente`, `Importo`, `Data`, `Prodotto`) ' + 
										'VALUES (' + data.Utente + ', ' + data.Importo + ', NOW(),  ' + data.Prodotto +')', 
											function(err, row) {
												connection.end();
												callback(err, row);
											});
										break;
										case "addPayment":
										connection.query('INSERT INTO `piattaforma`.`Pagamento` (`Prodotto`, `Metodo`) VALUES (' + data.Prodotto + ', ' + data.Metodo + ')',
												function(err, row) {
													connection.end();
													callback(err, row);
												});
											break;
											case "addShipment":
											connection.query('INSERT INTO `piattaforma`.`Spedizone` ' +
												jsonToSQL(['Nome', 'Descrizione', 'TempoConsegna', 'Importo', 'Prodotto'], data),
												function(err, row) {
													connection.end();
													callback(err, row);
												});
											break;
											case "buyProduct":
											transaction(connection, ['INSERT INTO `piattaforma`.`CronologiaVendite` ' +
												jsonToSQL(['Prodotto', 'Acquirente'], data),
												'DELETE FROM `piattaforma`.`VenditaDiretta` WHERE Prodotto = ' + data.Prodotto,
												'UPDATE `piattaforma`.`Prodotto` SET Stato = 3 WHERE idProdotto = ' + data.Prodotto],
												function(err, row) {
													connection.end();
													callback(err, row);
												});
											break;
											case "listProducts":
											connection.query('SELECT p.idProdotto, p.Nome, p.Descrizione, p.Foto, p.Prezzo, c.Nome AS Categoria, p.Sottocategoria FROM Prodotto p, Categoria c WHERE p.Categoria = c.IdCategoria',
													function(err, row) {
														connection.end();
														callback(err, row);
													});
											break;
											case "listCatProducts":
											connection.query('SELECT p.idProdotto, p.Nome, p.Descrizione, p.Foto, p.Prezzo, c.Nome AS Categoria, p.Sottocategoria FROM Prodotto p, Categoria c WHERE p.Categoria = c.idCategoria AND c.Nome = ' + data.Categoria,
													function(err, row) {
														connection.end();
														callback(err, row);
													});
											break;

											case "listDateProducts":
											connection.query('SELECT * FROM `piattaforma`.`Prodotto` WHERE Data > ' + data.Data,
													function(err, row) {
														connection.end();
														callback(err, row);
													});
											break;
											case "userProducts":
											connection.query('SELECT * FROM Prodotto WHERE Proprietario = (SELECT Utente FROM Credenziali WHERE Username=' + data.Username + ')',
														function(err, row) {
															connection.end();
															callback(err, row);
														});
													break;
													case "showUserProfil":
													connection.query('SELECT Nome, Cognome, Residenza FROM Utente WHERE idUtente = (SELECT Utente FROM Credenziali WHERE Username = ' + data.Username + ')', 
															function(err, row) {
																connection.end();
																callback(err, row);
															});
														break;
														case "showProduct":
														connection.query('SELECT * FROM Prodotto WHERE idProdotto =' + data.Prodotto,
															function(err, row) {
																connection.end();
																callback(err, row);
															});
														break;
														case "showChronik":
														connection.query('SELECT * FROM CronologiaVendite WHERE Acquirente = ' + data.Utente,
															function(err, row) {
																connection.end();
																callback(err, row);
															});
														break;
														default:
														connection.end();
														callback("No such action");
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
				values += json[el] + ', ';
			}
			else {
				str += '`' + el + '`';
				values += json[el];
			}
		});
	return(('(' + str + ') VALUES(' + values + ')').replace(/\"NOW\(\)\"/gi, "NOW()")); 
}

function transaction(connection, queryList, callback) {
	var res = [];
	console.log(queryList);
	var firstID = undefined;
	connection.beginTransaction(function(err) {
		if (err) { 
			callback(err);
		}
		query(0);
		function query(i){
			if(firstID !== undefined)
				queryList[i] = queryList[i].replace(/\$LAST_INSERT_ID/gi, firstID);
			//console.log(queryList[i], firstID);
			connection.query(queryList[i], function(err, result) {
				if (err) { 
					connection.rollback(function() {
						callback(err);
					});
				}
				else {
					res[i] = result;
					if(firstID === undefined)
						firstID = result.insertId;
					//do next query
					if(queryList[i+1] == undefined)
						commit();
					else
						query(i+1);
				}
			});
		}

		function commit(){
			connection.commit(function(err) {
				if (err) { 
					connection.rollback(function() {
						callback(err);
					});
				}
				else {
					callback(null, res);
				}
			});

		}
	});
}
function escapeInput(connection, data) {
	for(value in data) {
		data[value] = connection.escape(data[value]);
	}
	return data;
}
