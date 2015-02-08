var React = require('react');
var Content = require('./content');
module.exports = function (data, containerId) {
	var container = document.getElementById(containerId || 'content');
	React.render(
			<Content {...data} />,
			container
			);
};
