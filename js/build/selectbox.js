(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key');

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var _this = this;
		var options = this.props.items.map(function(item){
			var isSelected = item.value === _this.props.selectedValue;
			return React.DOM.option( {key:ReactKey.key(), selected:isSelected, defaultValue:_this.props.selectedValue, value:item.value}, item.text);
		});
		return (
				React.DOM.select( {onChange:this.props.onChange, className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
},{"./react-key":2}],2:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	};
}

module.exports = new ReactKey();
},{}]},{},[1])