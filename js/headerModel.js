/** @jsx React.DOM */
var Header = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
			<div className="header">
				<ul className="nav nav-pills pull-right">
					<MenuItem name="Home" isActive="true" />
					<MenuItem name="About" />
					<MenuItem name="Contact" />
				</ul>
				<h3 className="text-muted">{this.props.projectName}</h3>
			</div>
			);
	}
});

var MenuItem = React.createClass({
	render: function(){
		return (
			<li><a href="#">{this.props.name}</a></li>
		);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer')
);