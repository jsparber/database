var views = {};
var addUser = {};
addUser.action ='createForm';
addUser.title = 'nuovo Utente';
addUser.formAction = '/job/?action=addUser';
addUser.formMethod = 'post';
addUser.SubmitText = 'registrarti';
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
changeUserProfile.SubmitText = 'Cambi Profilo';
changeUserProfile.form  = [
	{'label' : 'E-mail', 'name' : 'E-mail'},
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Cognome', 'name' : 'Cognome'},
	{'label' : 'Residenza', 'name' : 'Residenza'},
	{'label' : 'Indirizzo di Spedizione', 'name' : 'IndirizzoSpedizione'}
];

views.changeUserProfile  = changeUserProfile;

var data = {};
data.action ='createForm';
data.title = 'Username e Password';
data.SubmitText = 'Cambi Password';
data.formAction = '/job/?action=changeCredential';
data.formMethod = 'post';
data.form = [ 
	{'label' : 'Username', 'name' : 'Username'},
	{'label' : 'Password', 'name' : 'Password'}
	]

views.changeCredential  = data;

var data = {};
data.action ='createForm';
data.title = 'nuovo prodotto';
data.formAction = '/job/?action=addProduct';
data.formMethod = 'post';
data.form = [ 
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Descrizione', 'name' : 'Descrizione'},
	{'label' : 'Prezzo', 'name' : 'Prezzo'},
	{'label' : 'Categoria', 'name' : 'Categoria'},
	{'label' : 'Imagine', 'name' : 'Foto'},
	{'label' : 'Sottocategoria', 'name' : 'Sottocategoria'},
	{'label' : 'Prezzo di Partenza', 'name' : 'PrezzoPartenza'},
	{'label' : 'Prezzo di Riserva', 'name' : 'PrezzoRiserva'},
	{'label' : 'Tipo', 'name' : 'Stato'},
	{'label' : 'Pagamento', 'sub' : [
		{'label' : 'Metodo', 'name' : 'PagamentoMetodo'}]},
	{'label' : 'Spedizione', 'sub' : [
		{'label' : 'Nome', 'name' : 'SpedizioneNome'},
		{'label' : 'Descrizione', 'name' : 'SpedizioneDescrizione'},
		{'label' : 'Importo', 'name' : 'SpedizioneImporto'},
		{'label' : 'Tempo di Consegna', 'name' : 'SpedizioneTempoConsegna'}]}
		];

views.addProduct  = data;
/*
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
data.header = [
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Descrizione', 'name' : 'Descrizione'},
	{'label' : 'Prezzo', 'name' : 'Prezzo'},
	{'label' : 'Categoria', 'name' : 'Categoria'},
	{'label' : 'Sottocategoria', 'name' : 'Sottocategoria'},
];

views.listProducts = data;

var data = {};
data.action ='createList';
data.title = 'Prodotti';
data.header = [
	{'label' : 'Nome', 'name' : 'Nome'},
	{'label' : 'Descrizione', 'name' : 'Descrizione'},
	{'label' : 'Prezzo', 'name' : 'Prezzo'},
	{'label' : 'Categoria', 'name' : 'Categoria'},
	{'label' : 'Sottocategoria', 'name' : 'Sottocategoria'},
];

views.listCatProducts = data;

/*
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
