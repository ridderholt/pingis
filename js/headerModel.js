/** @jsx React.DOM */
var MenuItem = require('./menuItem');

var Header = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				<div className="header">
					<ul className="nav nav-pills pull-right">
						<MenuItem name="Statistik" isActive="true" />
						<MenuItem name="Ny spelare" isActive="false" />
						<MenuItem name="Spela match" isActive="false" />
					</ul>
					<h3 className="text-muted">{this.props.projectName}</h3>
				</div>
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));