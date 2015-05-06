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
		console.log(form);
		var fields = form.form.map(function(feld, index){
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
						<Form fields={feld.sub} />
						</div>
						)
		});
		return (
				<div>
				<form action={form.formAction} method={form.formMethod}>
				{fields}
				<input type="submit" value="Add"/>
				</form>
				</div>
				)
	}
});

var List = React.createClass({
	render: function() {
		console.log(this.props.values);
		var productList = this.props.values.map(function(product){
			return (
					<div>{JSON.stringify(product)}</div>
					)
		});
		return (
				<div>
				{productList}
				</div>
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
