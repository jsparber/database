var db = require('./db.js');

//(action, callback, data)

var data = {'Username' : 'jsparber',
	'Password' : 'secret',
	'E-mail' : 'julian@sparber.net',
 	'Nome' : 'Julian', 
	'Cognome' : 'Sparber', 
	'Residenza' : 'Via home Blablabal', 
	'IndirizzoSpedizione' : 'Via home Blablabal'
}

db('addUser', print, data);
db('addUser', print, data);
db('addUser', print, data);


function print(data) {
	console.log(data);
}
