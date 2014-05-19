(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow'),
	ReactKey = require('./react-key');

var ScoreboardTable = React.createClass({displayName: 'ScoreboardTable',
	getInitialState: function() {
		return {
			rows: []
		};
 	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				rows: result
			});
		}.bind(this));
	},
	render: function(){
		var rows = this.state.rows.map(function(row){
			return ScoreboardRow( {key:ReactKey.key(), data:row});
		});
		return (
			React.DOM.table( {className:"table table-striped"}, 
				React.DOM.thead(null, 
					React.DOM.tr(null, 
						React.DOM.th(null, "#"),
						React.DOM.th(null, "Namn"),
						React.DOM.th(null, "Vinster"),
						React.DOM.th(null, "Förluster"),
						React.DOM.th(null, "Obesegrad"),
						React.DOM.th(null, "Poäng")
					)
				),
				React.DOM.tbody(null, 
					rows
				)
			)
			);
	}
});

module.exports = ScoreboardTable;

},{"./react-key":2,"./scoreboardRow":3}],2:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	}
}

module.exports = new ReactKey();
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {
		return (
				React.DOM.tr(null, 
					React.DOM.td(null, this.props.data.position),
					React.DOM.td(null, this.props.data.name),
					React.DOM.td(null, "10"),
					React.DOM.td(null, "2"),
					React.DOM.td(null, "7"),
					React.DOM.td(null, this.props.data.score)
				)
			);
	}
});

module.exports = ScoreboardRow;
},{}]},{},[1])