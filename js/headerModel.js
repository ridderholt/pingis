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
			 <div className="navbar navbar-fixed-top navbar-inverse" role="navigation">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<a href="/" className="navbar-brand">{this.props.projectName}</a>
					</div>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							{items}
						</ul>
					</div>
				</div>
			</div>
			);
	}
});

