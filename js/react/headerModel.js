/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return MenuItem( {name:item.name, href:item.url, isActive:item.isActive} )
		});
		return (
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						items
					),
					React.DOM.h3( {className:"text-muted"}, this.props.projectName)
				)
			);
	}
});

