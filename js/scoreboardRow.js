/** @jsx React.DOM */
var ScoreboardRow = React.createClass({
	render: function () {
		return (
				<tr>
					<td>{this.props.data.position}</td>
					<td>{this.props.data.name}</td>
					<td>{this.props.data.score}</td>
				</tr>
			);
	}
});

module.exports = ScoreboardRow;