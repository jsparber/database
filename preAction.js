var db = require('./db');

var preAction = {};
preAction.createForm = function(callback, session){
	db('listPaymentMetodes', function(err, pay) {
		if(err) callback(err);
		else {
			db('listCat', function(err, cat) {
				var data = {}
				//cat.idCategoria
				data.Categoria = [];
				for(el in cat) {
					data.Categoria[cat[el].idCategoria] = cat[el].Nome;
				}
				data.PagamentoMetodo = [];
				for(el in pay) {
					data.PagamentoMetodo[pay[el].idMetodoPagamento] = pay[el].Nome;
				}
				data.Stato = ["Asta", "Vendita diretta"];
				callback(err, data);
			});
		}
	});

};

preAction.showUserProfil = function(callback, session){
	db('showCompleteUserProfil', function(err, profil) {
		console.log(profil[0]);
		callback(err, profil[0] || {});
	},{"IdUtente" : session.userId});

};
preAction.changeCredential = function(callback, session){

	callback(undefined, {"Username" : session.user});
};
module.exports = preAction;
