(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardDetails = React.createClass({displayName: 'ScoreboardDetails',
	render: function(){
		var rows = this.props.details.map(function(d){
			return React.DOM.tr(null, React.DOM.td(null, d.opponent),React.DOM.td(null, d.wins),React.DOM.td(null, d.losses))
		});
		return (
			React.DOM.table( {className:"table"}, 
				React.DOM.thead(null, 
					React.DOM.th(null, "Motståndare"),
					React.DOM.th(null, "Vinster"),
					React.DOM.th(null, "Förluster")
				),
				React.DOM.tbody(null, 
					rows
				)
			)
			);
	}
});

module.exports = ScoreboardDetails;
},{}]},{},[1])