var React = require('react');

module.exports = React.createClass({
	render: function() {
		//console.log(this.props.query);
		return (
				<div>
				<Header user={this.props.session.user} msg={this.props.query.msg} />
				<Body data={this.props.data} values={this.props.values} />
				</div>
				);
	}
});

//Header -->
var Header = React.createClass({
	render: function(){
		var MenuTyp  = (this.props.user)? MenuLogedIn : Menu;
		return(
				<div>
				<MenuTyp user={this.props.user} msg={this.props.msg} />
				</div>
				)
	}
});
var Menu = React.createClass({
	render: function() {
		return (
				<div>
				<h1>Piattaforma di aste</h1>
				<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav">
					<li className="active"><a href="/">Home</a></li>
					<li><a href="/?action=addUser">registrarti</a></li>
					<li><User user={this.props.user} /></li>
					<Search />
					</ul>
				</div>
				</div>
				</nav>
				<div>{this.props.msg}</div>
				</div>
				)
	}
});

var MenuLogedIn = React.createClass({
	render: function() {
					//<li className=""><a href="/?action=addFeedback">Scrivi un feedback</a></li>
		return (
				<div>
				<h1>Piattaforma di aste</h1>
				<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navbar-header">
					</div>
					<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav">
					<li className="active"><a href="/">Home</a></li>
					<li><a href="/?action=addProduct">inserici un prodotto</a></li>
					<li><a href="/?action=changeUserProfile">cambia profilo</a></li>
					<li><a href="/?action=changeCredential">cambia password</a></li>
					<li><User user={this.props.user} /></li>
					</ul>
					<Search />
				</div>
				</div>
				</nav>
				<div>{this.props.msg}</div>
				</div>
				)
	}
});

var User = React.createClass({
	render: function() {
		return (
				(this.props.user)? <LogoutButton/> : <LoginButton />
				)
	}
});

var LogoutButton = React.createClass({
	render: function() {
		return (
				<form action="/logout">
				<input type="submit" className="button btn bt-default" value="Logout" />
				</form>
				)
	}
});

var LoginButton = React.createClass({
	render: function() {
		return (
				<form className="navbar-form navbar-left" method="post" action="/login">
				 <div className="form-group">
				<label>User: 
				<input  className="form-control" type="text" name="Username"/>
				</label>
				<label>
				Password: 
				<input  className="form-control" type="password" name="Password"/>
				</label>
				<input className="btn btn-default" type="submit" value="Login" />
				</div>
				</form>
				)
	}
});

var Search = React.createClass({
	render: function() {
		return (
				<form className="navbar-form navbar-left" role="search" action="/search" type="GET">
        <div className="form-group">
				          <input type="text" name="search" className="form-control" placeholder="Search" />
									<input type="submit" className="btn btn-default" value="search" placeholder="Search" />
				</div>
				</form>
				)
	}
});

//<--End Header
//Body -->

var Body = React.createClass({
	render: function() {
		var El = Empty;
		switch(this.props.data.action) {
			case 'createForm':
				El = Form;
				break;
			case 'createList':
				El = List;
				break;
			case 'show':
				El = show;
				break;
			case 'showProduct':
				El = showProduct;
				break;
		}
		return (
				<div>
				<El cmd={this.props.data} values={this.props.values} />
				</div>
				)
	}
});

//All user input forms
var Form = React.createClass({
	render: function() {
		var form = this.props.cmd;
		//console.log(form);
		return (
				<div>
				<h1>{form.title}</h1>
				<form action={form.formAction} method={form.formMethod}>
				<FormFields form={form.form} dbData={form.dbData} />
				<input type="submit" value={form.SubmitText}/>
				</form>
				</div>
				)
	}
});

var FormFields = React.createClass({
	render: function() {
		var form = this.props.form;
		var values = this.props.dbData;
		console.log("Values: ", values);
		var fields = form.map(function(feld, index){
			if(feld.type === "select") {
				console.log("Values: " + values);
				console.log("Name: " + feld.name);
				var inputFeld = <PopDown values={values[feld.name]} name={feld.name} />
				//var inputFeld = <select />
			}
				else {
				var inputFeld = <input type={feld.type || "text"} name={feld.name} placeholder={values[feld.name]}></input>
			}
			if(feld.sub === undefined) {
				return(
					<div>
						<label>{feld.label}: 
						{inputFeld}
						</label>
					</div>
					);
			}
					else
				return(
						<div>
						<h2>{feld.label}</h2>
						<FormFields form={feld.sub}  dbData={values} />
						</div>
						)
		});
		return 	(
				<div>
				{fields}
				</div>
				)
	}
});

var PopDown = React.createClass({
	render: function() {
		var values = this.props.values;
		console.log(">>>>>>>>>>>>>>>>>>>>Select Name: " + this.props.name);
		console.log("Vlaue: " + values[2]);
		var optionList = values.map(function(val, index){
			console.log("Data" + index);
			return (
				(val != undefined)? <option value={index}>{val}</option> : ""
				)
		});
		return(
				<select name={this.props.name}>
				{optionList}
				</select>
				)
	}
});

var show = React.createClass({
	render: function() {	

		return (
				<div>
				<h2>
				{this.props.values[0].Nome + " " + this.props.values[0].Cognome}
				</h2>
				{this.props.values[0].Residenza}
				</div>
				)
	}
});

var showProduct = React.createClass({
	render: function() {	
		/*
		{ idProdotto: 48,
			Nome: 'Bici',
			Descrizione: 'Bici nuova in bianco',
			Foto: 'my picture',
			Prezzo: 3,
			Categoria: 9,
			Sottocategoria: 'Sport',
			Proprietario: 1,
			Stato: 1,
			Date: null,
			Data: Sat May 09 2015 15:37:01 GMT+0200 (CEST) }
		*/
		return (
					<div>
						<img style={{width: "300px", "margin-left": "100px"}} src={this.props.values[0].Foto || "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png"} />
						<div style={{display: "inline-block", "margin-left": "100px"}}>
						<h1>
						{this.props.values[0].Nome}
						</h1>
						<div>
						{this.props.values[0].Descrizione}
						</div>
						<div>
						{"Prezzo: " + this.props.values[0].Prezzo}
						</div>
						<div>
						{"Sottocategoria: " + this.props.values[0].Sottocategoria}
						</div>
						<div>
						{"data di inserimento: " + this.props.values[0].Data || indefinito}
						</div>
						</div>
				</div>
				)
	}
});

var TableRow = React.createClass({
	render: function() {
		var row = this.props.row;
		var header= this.props.header;
		var line = header.map(function(el){
			return(
					<td>
						{row[el.name]}
					</td>
					)
		});
		console.log(row);
		return (
			<tr>
			{line}
			<td>
			<a href={"?action=showProduct&Prodotto=" + row.idProdotto}>dettagli</a>
			</td>
			</tr>
			)
		}
});

var TableHeader = React.createClass({
	render: function() {
		var header= this.props.header;
		var head = header.map(function(el){
			return(
					<th>
						{el.label}
					</th>
					)
		});
		return (
				<thead>
				{head}
				</thead>
			)
		}
});
var List = React.createClass({
	render: function() {
		var cmd = this.props.cmd;
		var values = this.props.values;
		var table = values.map(function(row){
			return (
					<TableRow row={row} header={cmd.header}/>
					)
		});
		return (
				<table className="table table-striped">
				<TableHeader header={cmd.header}/>
				<tbody>
				{table}
				</tbody>
				</table>
				)
	}
});



var Empty = React.createClass({
	render: function() {
		return (
				<div />
				)
	}
});

//<-- End Body
