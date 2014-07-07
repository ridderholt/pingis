/** @jsx React.DOM */
'use strict';

/*jshint asi: false*/

var menuItem = React.createClass({displayName: 'menuItem',
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			React.DOM.li( {className:css}, React.DOM.a( {href:this.props.href}, this.props.name))
			);
	}
});

module.exports = menuItem;