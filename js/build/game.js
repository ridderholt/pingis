(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = require('./headerModel'),
	GameForm = require('./gameForm');


React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: true
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(
	GameForm({ source: '/api/players' }),
	document.getElementById('game-container'));
},{"./gameForm":2,"./headerModel":3}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {
			players: []
		};
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				players: result
			});
		}.bind(this));
	},
	render: function(){
		return (
			React.DOM.form( {className:"form-horizontal", role:"form"}, 
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.div( {className:"col-sm-offset-2 col-sm-10"}, 
						React.DOM.button( {type:"submit", className:"btn btn-success"}, "Spara")
					)
				)
			)
			)
	}
});

module.exports = gameForm;
},{"./selectbox":6}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return MenuItem( {name:item.name, href:item.url, isActive:item.isActive} )
		});
		return (
			 React.DOM.div( {className:"navbar navbar-fixed-top navbar-inverse", role:"navigation"}, 
				React.DOM.div( {className:"container"}, 
					React.DOM.div( {className:"navbar-header"}, 
						React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
							React.DOM.span( {className:"icon-bar"}),
							React.DOM.span( {className:"icon-bar"}),
							React.DOM.span( {className:"icon-bar"})
						),
						React.DOM.img( {className:"logo", src:"/img/lagetSe.png", alt:this.props.projectName} )
					),
					React.DOM.div( {className:"collapse navbar-collapse"}, 
						React.DOM.ul( {className:"nav navbar-nav"}, 
							items
						)
					)
				)
			)
			);
	}
});


},{"./menuItem":4}],4:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

module.exports = React.createClass({displayName: 'exports',
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			React.DOM.li( {className:css}, React.DOM.a( {href:this.props.href}, this.props.name))
			);
	}
});
},{}],5:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	}
}

module.exports = new ReactKey();
},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key')

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var options = this.props.items.map(function(item){
			return React.DOM.option( {key:ReactKey.key(), value:item.value}, item.text)
		});
		return (
				React.DOM.select( {className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
},{"./react-key":5}]},{},[1])