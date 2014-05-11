(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = require('./headerModel');

React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: true
	},
	{
		name: 'Ny spelare',
		url: 'http://localhost:1337/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));
},{"./headerModel":2}],2:[function(require,module,exports){
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
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						items
					),
					React.DOM.h3( {className:"text-muted"}, this.props.projectName)
				)
			);
	}
});


},{"./menuItem":3}],3:[function(require,module,exports){
'use strict';


/*global module:true, React: true*/

module.exports = React.createClass({
	render: function(){
		return (
			React.DOM.li({
				className: this.props.isActive === true ? 'active' : '',
				children: React.DOM.a({
					href: this.props.href,
					children: this.props.name
				})
			}));
	}
});
},{}]},{},[1])