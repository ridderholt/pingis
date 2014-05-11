/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

module.exports = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return <MenuItem name={item.name} href={item.url} isActive={item.isActive} />
		});
		return (
				<div className="header">
					<ul className="nav nav-pills pull-right">
						{items}
					</ul>
					<h3 className="text-muted">{this.props.projectName}</h3>
				</div>
			);
	}
});

