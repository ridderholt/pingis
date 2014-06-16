/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({
	render: function () {
		return (
				<tr>
					<td>#{this.props.data.position}</td>
					<td>
						<div className="img-container">
							<img src={this.props.data.imageUrl} />
						</div>
					</td>
					<td>
						{this.props.data.name} ({this.props.data.score}p)<br/>
						<div className="info">
							<span className="badge list-group-item-success">Vinster: {this.props.data.wins}</span>
							<span className="badge list-group-item-danger">Förluser: {this.props.data.losses}</span>
							<span className="badge list-group-item-info">Obesegrad: {this.props.data.winStreak}</span>
						</div>
					</td>
				</tr>
			);
	}
});

module.exports = ScoreboardRow;