/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

var Header = React.createClass({displayName: 'Header',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						MenuItem( {name:"Statistik", isActive:"true"} ),
						MenuItem( {name:"Ny spelare", isActive:"false"} ),
						MenuItem( {name:"Spela match", isActive:"false"} )
					),
					React.DOM.h3( {className:"text-muted"}, this.props.projectName)
				)
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));