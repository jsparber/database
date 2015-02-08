var React = require('react');
var Content = require('./Content');
module.exports = React.createClass({
	render: function() {
		var data = this.props.data;
		var req = this.props.req;
		var loggedIn = this.props.loggedIn;
		var body;
		var loginButton;
		console.log("######", req);
		if (loggedIn) {
			loginButton = <LogoutButton />;
		} else {
			loginButton = <LoginButton />;
		}
		switch (req){
		case "form": 
			body = <Form data={data}/>;
			break;
		case "products": 
			body = <Products products = {data.products}/>
			break;
		}
		return (
				<html lang="en">
				<head>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
				<script src="/scripts/main.js"></script>
				</head>
				<body>
				<Menu />
				<Search />
				{loginButton}
				{body}
				</body>
				</html>
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
		alert("Doing Login");
	},
	render: function() {
		return (
				<button onClick={this.clickHandler}>Logout</button>
				)
	}
});

var LoginButton = React.createClass({
	render: function() {
		return (
				<button>Login</button>
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
		console.log(this.props.products)
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
		console.log(this.props.products)
			var forms = this.props.data.map(function(form, index){
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

