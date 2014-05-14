(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {

		};
	},
	render: function(){
		return (
			React.DOM.form( {className:"form-horizontal", role:"form"}, 
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:[{ text: 'Robin Ridderholt', value: 1 }]} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:[{ text: 'Robin Ridderholt', value: 1 }]} )
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
},{"./selectbox":2}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var options = this.props.items.map(function(item){
			return React.DOM.option( {value:item.value}, item.text)
		});
		return (
				React.DOM.select( {className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
},{}]},{},[1])