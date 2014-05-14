/** @jsx React.DOM */
'use strict';

module.exports = React.createClass({
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			<li className={css}><a href={this.props.href}>{this.props.name}</a></li>
			);
	}
});