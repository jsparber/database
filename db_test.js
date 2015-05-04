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

//db('addUser', print, data);
//data.Username = "jsparber2";
//db('addUser', print, data);
//data.Username = "jsparber5";
//db('addUser', print, data);

//Autore should be session user
//var dataFeedback = {'Utente' : 3 , 'Autore' : 1, 'Contenuto': 'Stato ottimo', 'Valutazione' : 10};

//db('addFeedback', print, dataFeedback);

/*var data = {'Username' : 'jsparber',
	'Password' : 'secret',
	'E-mail' : 'julian@sparber.net',
 	'Nome' : 'Julian', 
	'Cognome' : 'Sparber', 
	'Residenza' : 'Via home Blablabal', 
	'IndirizzoSpedizione' : 'Via City 2 City 43545',
	'idUtente' : 003
}


db('changeUserProfile', print, data);
*/
var data = {'Username' : 'jsparber',
	'Password' : 'mysupersecertpassword',
	'idUtente' : 003
}

db('changeCredential', print, data);




//data = {'Utente' : 001, 'Importo': 10.20, 'Prodotto': 002};
//db('bid', print, data);


function print(error, data) {
	if(error)
		console.error(error);
	else
		console.log(data);
}
