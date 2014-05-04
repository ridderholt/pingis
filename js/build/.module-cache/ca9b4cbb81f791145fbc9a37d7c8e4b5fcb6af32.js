(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ScoreboardRow = React.createClass({
	render: function () {
		return (

			React.DOM.tr({
				children: [
					React.DOM.td({
						children: '1'
					}),
					React.DOM.td({
						children: 'Robin'
					}),
					React.DOM.td({
						children: '173'
					})]
			})

			);
	}
});

module.exports = ScoreboardRow;
},{}]},{},[1])