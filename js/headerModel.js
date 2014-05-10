/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

var Header = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				<div className="header">
					<ul className="nav nav-pills pull-right">
						<MenuItem name="Statistik" href="/" isActive="{this.props.activeMenu === 'Statistik'}" />
						<MenuItem name="Ny spelare" href="http://localhost:1337/Player" isActive="false" />
						<MenuItem name="Spela match" href="/" isActive="false" />
					</ul>
					<h3 className="text-muted">{this.props.projectName}</h3>
				</div>
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen', activeMenu: 'Statistik' }),
	document.getElementById('headerContainer'));