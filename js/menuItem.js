/** @jsx React.DOM */
'use strict';

/*jshint asi: false*/

var menuItem = React.createClass({
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			<li className={css}><a href={this.props.href}>{this.props.name}</a></li>
			);
	}
});

module.exports = menuItem;