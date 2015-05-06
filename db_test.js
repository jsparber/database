var db = require('./db.js');

/*Api discription
	addUser
	var data = {'Username' : '',
	'Password' : '',
	'E-mail' : '',
	'Nome' : '', 
	'Cognome' : '', 
	'Residenza' : '', 
	'IndirizzoSpedizione' : ''
	};
	addFeedback
	var data = {'Utente' : '',
	'Autore' : '',
	'Contenuto': 'Stato ottimo',
	'Valutazione' : ''
	};
	changeUserProfile
	var data = {'E-mail' : '',
	'Nome' : '', 
	'Cognome' : '', 
	'Residenza' : '', 
	'IndirizzoSpedizione' : ''
	};
	changeCredential
	var data = {'Username' : '',
	'Password' : '',
	'idUtente' : sessionUser 
	}
	login
	var data = {'Username' : '',
	'Password' : '',
	}
	addProduct
	var data = {'Nome' : '',
	'Descrizione' : '',
	'Foto' : '',
	'Prezzo' : '',
	'Categoria' : '',
	'Sottocategoria' : '',
	'Proprietario' : '',
	'Stato' : '', //should be 1 (asta) or 2 (vendita diretta)
	'PrezzoPartenza' : '', //those values as to be defined when stato = 1
	'PrezzoRiserva' : ''
	};

	data.Spedizione = {'Nome' : '',
	'Descrizione' : '',
	'TempoConsegna' : '',
	'Importo' : '',
	'Prodotto' : ''
	}

	data.Pagamento = {'Prodotto' : '',
	'Metodo' : ''
	}

	bid
	var data = {'Utente' : '',
	'Importo' : '',
	'Prodotto' : ''
	};

	addPayment
	var data = {};
	data.Pagamento = {'Prodotto' : '',
	'Metodo' : ''
	}

	addShipment
	var data = {};
	data.Spedizione = {'Nome' : '',
'Descrizione' : '',
	'TempoConsegna' : '',
	'Importo' : '',
	'Prodotto' : ''
	}
buyProduct
var data = {
	'Prodotto' : '',
	'Acquirente' : ''	// Sesseion user
}
listProducts
var data = undefined;

listCatProducts
var data = {
	Categoria = ''
}

listDateProducts
var data = {
	Date : '' // this format '2013-01-28 21:00:00'
}

userProducts
var data = {
	Username : ''
}

showUserProfil
var data = {
	Username : ''
}

showProduct
var data= {
	Prodotto : ''
}

showChronik
var data = {
	Utente : '' //session user
}

*/
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
//data.Username = "jsparber8";
//db('addUser', print, data);
//data.Username = "jsparber9";
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
/*var data = {'Username' : 'jsparber',
	'Password' : 'mysupersecertpassword',
	'idUtente' : 003
	}

	db('changeCredential', print, data);
	*/
//login
var data = {'Username' : 'jsparber',
	'Password' : '" OR "1" = "1',
}

db('login', print, data);

//addProduct
var data = {'Nome' : 'Testprodotto',
	'Descrizione' : 'Mia piccola descrizione',
	'Foto' : 'https://ilfoto.com',
	'Prezzo' : '0', //has to be 0 when asta
	'Categoria' : '001',
	'Sottocategoria' : 'Motore, Giocchi',
	'Proprietario' : '002',
	'Stato' : '001', //should be asta or vendita diretta
	'PrezzoPartenza' : '1.0',
	'PrezzoRiserva' : '10'
};

data.Spedizione = {'Nome' : 'SDA',
	'Descrizione' : 'Corriere SDA',
	'TempoConsegna' : '3-7 Giorni',
	'Importo' : '13.00',
}

data.Pagamento = {
	'Metodo' : '001'
}
//db('addProduct', print, data);

//	bid
var data = {'Utente' : '001',
	'Importo' : '33.30',
	'Prodotto' : '033'
};

//db('bid', print, data);

//addPayment
var data = {};
data.Pagamento = {'Prodotto' : '033',
	'Metodo' : '002'
}

//db('addPayment', print, data);

//addShipment
var data = {};
data.Spedizione = {'Nome' : 'TNT',
	'Descrizione' : 'Corriere Espresso',
	'TempoConsegna' : '24h',
	'Importo' : '30.0',
	'Prodotto' : '033'
}

//db('addShipment', print, data);



//	buyProduct
var data = {
	'Prodotto' : '37',
	'Acquirente' : '001'	// Sesseion user
}

//db('buyProduct', print, data);

//data = {'Utente' : 001, 'Importo': 10.20, 'Prodotto': 002};
//db('bid', print, data);


function print(error, data) {
	if(error)
		console.error(error);
	else
		console.log(data);
}
