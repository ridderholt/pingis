/** @jsx React.DOM */
'use strict';
var MenuItem = React.createFactory(require('./menuItem')),
	ReactKey = require('./react-key');

var headerModel = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return <MenuItem key={ReactKey.key()} name={item.name} href={item.url} isActive={item.isActive} />;
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
						<img className="logo" src="/img/lagetSe.png" alt={this.props.projectName} />
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

module.exports = headerModel;