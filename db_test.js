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
data.Username = "jsparber2";
db('addUser', print, data);
data.Username = "jsparber5";
db('addUser', print, data);


function print(error, data) {
	if(error)
		console.error(error);
	else
		console.log(data);
}
