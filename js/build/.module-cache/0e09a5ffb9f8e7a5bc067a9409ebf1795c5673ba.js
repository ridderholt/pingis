/** @jsx React.DOM */
// var MenuItem = require('./menuItem');

var Header = React.createClass({displayName: 'Header',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						React.DOM.li( {className:"active"}, React.DOM.a( {href:"#"}, "Home")),
						React.DOM.li(null, React.DOM.a( {href:"#"}, "About")),
						React.DOM.li(null, React.DOM.a( {href:"#"}, "Contact"))
					),
					React.DOM.h3( {className:"text-muted"}, "Project name")
				)
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));