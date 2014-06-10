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
					<td>#{this.props.data.position}</td>
					<td>
						<div style={imgDivStyle}>
							<img style={imgStyle} src={this.props.data.imageUrl} />
						</div>
					</td>
					<td>
						{this.props.data.name} ({this.props.data.score}p)<br/>
						<div className="info">Vinster: {this.props.data.wins} Förluser: {this.props.data.losses} Obesegrad: {this.props.data.winStreak}</div>
					</td>
				</tr>
			);
	}
});

module.exports = ScoreboardRow;