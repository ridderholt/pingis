/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createFactory(require('./scoreboardRow')),
	ReactKey = require('./react-key'),
	$ = require('jQuery');

var ScoreboardTable = React.createClass({
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
			return <ScoreboardRow key={ReactKey.key()} data={row}></ScoreboardRow>;
		});
		return (
			<div className="scoreboard">
				{rows}
			</div>
			);
	}
});

module.exports = ScoreboardTable;
