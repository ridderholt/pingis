(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
var MenuItem = require('./menuItem');

var Header = React.createClass({displayName: 'Header',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						MenuItem( {name:"Statistik", isActive:"true"} ),
						MenuItem( {name:"Ny spelare", isActive:"true"} ),
						MenuItem( {name:"Spela match"} )
					),
					React.DOM.h3( {className:"text-muted"}, this.props.projectName)
				)
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));
},{"./menuItem":2}],2:[function(require,module,exports){

module.exports = React.createClass({
	render: function(){
		return (
			React.DOM.li({
				className: this.props.isActive ? 'active' : '',
				children: React.DOM.a({
					href: '#',
					children: this.props.name
				})
			}));
	}
});
},{}]},{},[1])