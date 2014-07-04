/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({
	render: function () {
		return (
				<div className="col-lg-10 latter-step">
					<div className="col-lg-1 position">#{this.props.data.position}</div>
					<div className="col-lg-3">
						<div className="img-container">
							<img src={this.props.data.imageUrl} />
						</div>
					</div>
					<div className="col-lg-6">
						{this.props.data.name} ({this.props.data.score}p)<br/>
						<div className="info">
							<span className="badge list-group-item-success">Vinster: {this.props.data.wins}</span>
							<span className="badge list-group-item-danger">Förluser: {this.props.data.losses}</span>
							<span className="badge list-group-item-info">Obesegrad: {this.props.data.winStreak}</span>
						</div>
					</div>
				</div>
			);
	}
});

module.exports = ScoreboardRow;