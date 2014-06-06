/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({
	render: function () {

		var imgDivStyle = {
			borderRadius: '50px',
			position: 'relative',
			overflow: 'hidden',
			width: '100px',
			height: '100px'
		};

		var imgStyle = {
			width: '100px'
		};

		return (
				<tr>
					<td>{this.props.data.position}</td>
					<td>
						<div style={imgDivStyle}>
							<img style={imgStyle} src={this.props.data.imageUrl} />
						</div>
					</td>
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