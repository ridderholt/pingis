/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow');

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
			return ScoreboardRow( {data:row});
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

React.renderComponent(
	ScoreboardTable({ source: '//localhost:1337/api/scoreboard' }),
	document.getElementById('scoreboard-contaier'));
