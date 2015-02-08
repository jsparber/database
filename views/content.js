	var React = require('react');

module.exports = React.createClass({
	render: function() {
		var data = this.props;
		var req = data.req;
		var loggedIn = data.loggedIn;
		var body;
		var loginButton;
		if (loggedIn) {
			loginButton = <LogoutButton />;
		} else {
			loginButton = <LoginButton />;
		}
		switch (req){
		case "form": 
			body = <Form forms = {data.forms}/>;
			break;
		case "products": 
			body = <Products products = {data.products}/>
			break;
		}
		return (
				<div>
				<Menu />
				<Search />
				{loginButton}
				{body}
				</div>
				);
	}
});

var Menu = React.createClass({
	render: function() {
		return (
				<div>Piattaforma di aste</div>
				)
	}
});

var LogoutButton = React.createClass({
	clickHandler: function() {
		alert("Doing Logout");
	},
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

var Products = React.createClass({
	render: function() {
			var productList = this.props.products.map(function(product){
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

var Form = React.createClass({
	render: function() {
			var forms = this.props.forms.map(function(form, index){
				var fieldes = form.map(function(field, index){
					if (index > 0)
						return (
								<div>{field}: 
								<input name={field} />
								</div>
								)
				});
				return (
						<div>
						{fieldes}
						</div>
						)
			});
		return (
				<div>
				<form>
				{forms}
				</form>
				</div>
				)
	}
});

