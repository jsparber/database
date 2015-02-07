var React = require('react');
var Content = require('./Content');
module.exports = React.createClass({
	render: function() {
		var data = this.props.data;
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
				<Products products = {data.products}/>
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

