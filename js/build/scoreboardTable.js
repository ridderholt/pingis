(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow'),
	ReactKey = require('./react-key'),
	$ = (window.$);

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
			React.DOM.div( {className:"scoreboard"}, 
				rows
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
	};
}

module.exports = new ReactKey();
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var $ = (window.$),
	CssAnimation = React.addons.CSSTransitionGroup;

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	getInitialState: function(){
		return {
			showDetails: false
		}
	},
	onShowStats: function(e){
		e.preventDefault();
		this.setState({
			showDetails: true
		});
	},
	render: function () {
		var detailsCss = this.state.showDetails ? 'row col-lg-10 animated bounceInDown' : 'hidden';
		return (
				React.DOM.div( {onClick:this.onShowStats, className:"col-lg-10 latter-step"}, 
					React.DOM.div( {className:"col-lg-1 position"}, "#",this.props.data.position),
					React.DOM.div( {className:"col-lg-3"}, 
						React.DOM.div( {className:"img-container"}, 
							React.DOM.img( {src:this.props.data.imageUrl} )
						)
					),
					React.DOM.div( {className:"col-lg-6"}, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluser: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					),
					React.DOM.div( {className:detailsCss}, 
						"Testar"
					)
				)
			);
	}
});

module.exports = ScoreboardRow;
},{}]},{},[1])