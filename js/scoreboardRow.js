/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({
	render: function () {
		return (
				<tr>
					<td>1</td>
					<td>{this.props.data.name}</td>
					<td>{this.props.data.wins}</td>
					<td>{this.props.data.losses}</td>
					<td>{this.props.data.winStreak}</td>
					<td>{this.props.data.score}</td>
				</tr>
			);
	}
});

module.exports = ScoreboardRow;