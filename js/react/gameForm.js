/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {
			players: []
		};
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				players: result
			});
		}.bind(this));
	},
	render: function(){
		return (
			React.DOM.form( {className:"form-horizontal", role:"form"}, 
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {items:this.state.players} )
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