/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow'),
	ReactKey = require('./react-key');

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
			<table className="table table-striped">
				<thead>
					<tr>
						<th>#</th>
						<th>Namn</th>
						<th>Vinster</th>
						<th>Förluster</th>
						<th>Obesegrad</th>
						<th>Poäng</th>
					</tr>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			);
	}
});

module.exports = ScoreboardTable;
