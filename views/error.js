var React = require('react');
var Content = require('./content');
module.exports = React.createClass({
	render: function() {
		console.log(this.props);
				return (
					<html lang="en">
					<head>
					<meta name="viewport" content="width=device-width, initial-scale=1"/>
					<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"/>
					</head>
					<body>
					<div id="content"> {this.props.error} </div>
					<div id="message"> {this.props.message} </div>
					</body>
					</html>
					);
				}
				});
