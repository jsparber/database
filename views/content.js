var React = require('react');

module.exports = React.createClass({
	render: function() {
		return (
				<div>
				<Header user={this.props.session} />
				<Body data={this.props.data} values={this.props.values} />
				</div>
				);
	}
});

//Header -->
var Header = React.createClass({
	render: function(){
		return(
				<div>
				<Menu />
				<User user={this.props.user} />
				<Search />
				</div>
				)
	}
});
var Menu = React.createClass({
	render: function() {
		return (
				<div>Piattaforma di aste</div>
				)
	}
});
var User = React.createClass({
	render: function() {
		return (
				<LoginButton />
				)
	}
});

var LogoutButton = React.createClass({
	render: function() {
		return (
				<form action="/logout">
				<input type="submit" className="button" value="Logout" />
				</form>
				)
	}
});

var LoginButton = React.createClass({
	clickHandler: function() {
		alert("Doing Login");
	},
	render: function() {
		return (
				<form method="post" action="/login">
				User: 
				<input type="text" name="user" className="button"/>
				Password: 
				<input type="password" name="password" className="button"/>
				<input type="submit" className="button" value="Login" />
				</form>
				)
	}
});

var Search = React.createClass({
	render: function() {
		return (
				<form action="/search" type="GET">
				<input name="query"/>
				<input type="submit" value="search" placeholder="Search" />
				</form>
				)
	}
});

//<--End Header
//Body -->

var Body = React.createClass({
	render: function() {
		console.log(this.props);
		var El = Empty;
		switch(this.props.data.action) {
			case 'createForm':
				El = Form;
				break;
			case 'createList':
				El = List;
				break;
		}
		return (
				<div>
				<El form={this.props.data} values={this.props.values} />
				</div>
				)
	}
});

//All user input forms
var Form = React.createClass({
	render: function() {
		var form = this.props.form;
		return (
				<div>
				<h1>{form.title}</h1>
				<form action={form.formAction} method={form.formMethod}>
				<FormFields form={form.form} />
				<input type="submit" value={form.SubmitText}/>
				</form>
				</div>
				)
	}
});

var FormFields = React.createClass({
	render: function() {
		var form = this.props.form;
		var fields = form.map(function(feld, index){
			if(feld.sub === undefined) {
				return(
					<div>
						<label>{feld.label}: 
						<input type="text" name={feld.name} />
						</label>
					</div>
					);
			}
					else
				return(
						<div>
						<h2>{feld.label}</h2>
						<FormFields form={feld.sub} />
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

var TableRow = React.createClass({
	render: function() {
		console.log("My working row", this.props.row);
		var row = this.props.row.map(function(el){
			console.log(el);
			return(
					<div>
					</div>
					)
		});
		return (
			<td>
			{row}
			</td>
			)
		}
});

var List = React.createClass({
	render: function() {
		var table = this.props.values.map(function(product){
			console.log("Im not undefined");
			return (
					<tr>
					<TableRow row={product}/>
					</tr>
					)
		});
		return (
				<table>
				<thead>
				</thead>
				{table}
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
