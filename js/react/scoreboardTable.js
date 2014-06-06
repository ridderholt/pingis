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
						React.DOM.th(null, " "),
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
