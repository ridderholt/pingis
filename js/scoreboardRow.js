/** @jsx React.DOM */
var ScoreboardRow = React.createClass({
	render: function () {
		return (
				<tr>
					<td>{this.props.data.position}</td>
					<td>{this.props.data.name}</td>
					<td>10</td>
					<td>2</td>
					<td>5</td>
					<td>{this.props.data.score}</td>
				</tr>
			);
	}
});

module.exports = ScoreboardRow;