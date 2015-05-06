var views = {};
var addUser = {};
addUser.action ='createForm';
addUser.title = 'nuovo Utente';
addUser.formAction = '/job/?action=addUser';
addUser.formMethod = 'post';
addUser.form = [{'label' : 'Username', 'name' : 'Username'},
	{'label' : 'Password', 'name' : 'Password'},
	{'label' : 'E-mail', 'name' : 'E-mail'},
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Cognome', 'name' : 'Cognome'},
	{'label' : 'Residenza', 'name' : 'Residenza'},
	{'label' : 'Indirizzo di Spedizione', 'name' : 'IndirizzoSpedizione'}
];

views.addUser = addUser;


var addFeedback = {};
addFeedback.action ='createForm';
addFeedback.title = 'scrivi tuo Feedback';
addFeedback.formAction = '/job/?action=addFeedback';
addFeedback.formMethod = 'post';
addFeedback.form = [
	{'label' : 'Contenuto', 'name' : 'Contenuto'},
	{'label' : 'Valutazione(1-100)', 'name' : 'Valutazione'}
];
views.addFeedback = addFeedback;

var changeUserProfile = {};
changeUserProfile.action ='createForm';
changeUserProfile.title = 'scrivi tuo Feedback';
changeUserProfile.formAction = '/job/?action=addFeedback';
changeUserProfile.formMethod = 'post';
changeUserProfile.form  = [
	{'label' : 'E-mail', 'name' : 'E-mail'},
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Cognome', 'name' : 'Cognome'},
	{'label' : 'Residenza', 'name' : 'Residenza'},
	{'label' : 'Indirizzo di Spedizione', 'name' : 'IndirizzoSpedizione'}
];

views.changeUserProfile  = changeUserProfile;
/*
views.changeCredential  = ['Username',
		'Password',
		'idUtente'
]

views.addProduct  = ['Nome',
		'Descrizione',
		'Foto',
		'Prezzo',
		'Categoria',
		'Sottocategoria',
		'Proprietario',
		'Stato',
		'PrezzoPartenza',
		'PrezzoRiserva',
	{'label' : 'Spedizione', 'sub' : ['Nome',
	'Descrizione',
	'TempoConsegna',
	'Importo',
	'Prodotto'
]}

views.addProduct.Pagamento = ['Prodotto',
	'Metodo'
]

views.bid  = ['Utente',
		'Importo',
		'Prodotto'
];

views.addPayment  = ['Prodotto',
	'Metodo'
]

views.addShipment = ['Nome',
	'Descrizione',
	'TempoConsegna',
	'Importo',
	'Prodotto'
]
views.buyProduct  = [
	'Prodotto',
	'Acquirente'	views. Sesseion user
]
*/
var data = {};
data.action ='createList';
data.title = 'Tutti Prodotti';

views.listProducts = data;
/*
views.listCatProducts  = [
	'Categoria'
]

views.listDateProducts  = [
	'Date' views. this format '2013-01-28 21:00:00'
]

views.userProducts  = [
	'Username'
]

views.showUserProfil  = [
	'Username'
]

views.showProduct = [
	'Prodotto'
]

views.showChronik  = [
	'Utente' views.session user
]
*/

module.exports = views;
