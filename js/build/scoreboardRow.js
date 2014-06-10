(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {

		var imgDivStyle = {
			borderRadius: '50px',
			position: 'relative',
			overflow: 'hidden',
			width: '100px',
			height: '100px'
		};

		var imgStyle = {
			width: '100px'
		};

		return (
				React.DOM.tr(null, 
					React.DOM.td(null, "#",this.props.data.position),
					React.DOM.td(null, 
						React.DOM.div( {style:imgDivStyle}, 
							React.DOM.img( {style:imgStyle, src:this.props.data.imageUrl} )
						)
					),
					React.DOM.td(null, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, "Vinser: ", this.props.data.wins, " Förluser: ", this.props.data.losses, " Obesegrad: ", this.props.data.winStreak)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;
},{}]},{},[1])