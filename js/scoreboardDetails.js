/** @jsx React.DOM */
'use strict';

var ScoreboardDetails = React.createClass({
	render: function(){
		var rows = this.props.details.map(function(d){
			return <tr><td>{d.opponent}</td><td>{d.wins}</td><td>{d.losses}</td></tr>
		});
		return (
			<table className="table">
				<thead>
					<th>Motståndare</th>
					<th>Vinster</th>
					<th>Förluster</th>
				</thead>
				<tbody>
					{rows}
				</tbody>
			</table>
			);
	}
});

module.exports = ScoreboardDetails;