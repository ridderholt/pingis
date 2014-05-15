/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow');

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
			return <ScoreboardRow data={row}></ScoreboardRow>;
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

React.renderComponent(
	ScoreboardTable({ source: '//localhost:1337/api/scoreboard' }),
	document.getElementById('scoreboard-contaier'));
