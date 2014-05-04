/** @jsx React.DOM */
// var MenuItem = require('./menuItem');

var Header = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				<div className="header">
					<ul className="nav nav-pills pull-right">
						<li className="active"><a href="#">Home</a></li>
						<li><a href="#">About</a></li>
						<li><a href="#">Contact</a></li>
					</ul>
					<h3 className="text-muted">Project name</h3>
				</div>
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));