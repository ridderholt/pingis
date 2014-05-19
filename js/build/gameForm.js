(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {
			players: [],
			winner: '',
			looser: ''
		};
	},
	onWinnerSelected: function(e){
		console.log(e.target.value);
		this.setState({winner: e.target.value});
	},
	onLooserSelected: function(e){
		console.log(e.target.value);
		this.setState({looser: e.target.value});
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				players: result,
			});
		}.bind(this));
	},
	render: function(){
		return (
			React.DOM.form( {className:"form-horizontal", role:"form"}, 
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.winner, onChange:this.onWinnerSelected, items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.looser, onChange:this.onLooserSelected, items:this.state.players} )
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
},{"./selectbox":3}],2:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	}
}

module.exports = new ReactKey();
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key')

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var _this = this;
		var options = this.props.items.map(function(item){
			var isSelected = item.value === _this.props.selectedValue;
			return React.DOM.option( {key:ReactKey.key(), selected:isSelected, value:item.value}, item.text)
		});
		return (
				React.DOM.select( {onChange:this.props.onChange, className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
},{"./react-key":2}]},{},[1])