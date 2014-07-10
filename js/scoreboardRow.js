/** @jsx React.DOM */
'use strict';

var $ = require('jQuery'),
	ScoreboardDetails = require('./scoreboardDetails');

var ScoreboardRow = React.createClass({
	getInitialState: function(){
		return {
			showDetails: false,
			playerDetails: []
		};
	},
	onShowStats: function(e){
		e.preventDefault();

		if(!this.state.showDetails && this.state.playerDetails.length === 0){
			$.getJSON('/api/scoreboard/details/' + this.props.data.playerId, function(details){
				this.setState({
					showDetails: !this.state.showDetails,
					playerDetails: details
				});
			}.bind(this));
		} else {
			this.setState({
				showDetails: !this.state.showDetails
			});
		}
	},
	render: function () {
		var detailsCss = this.state.showDetails ? 'row col-lg-10 animated zoomIn center-block' : 'hidden';
		return (
				<div onClick={this.onShowStats} className="row col-lg-10 latter-step">
					<div className="col-lg-1 position">#{this.props.data.position}</div>
					<div className="col-lg-3 profile">
						<div className="img-container">
							<img src={this.props.data.imageUrl} />
						</div>
					</div>
					<div className="col-lg-6 scores">
						{this.props.data.name} ({this.props.data.score}p)<br/>
						<div className="info">
							<span className="badge list-group-item-success">Vinster: {this.props.data.wins}</span>
							<span className="badge list-group-item-danger">Förluser: {this.props.data.losses}</span>
							<span className="badge list-group-item-info">Obesegrad: {this.props.data.winStreak}</span>
						</div>
					</div>
					<div className="col-lg-offset-2">
						<div className={detailsCss}>
							<ScoreboardDetails details={this.state.playerDetails}></ScoreboardDetails>
						</div>
					</div>
				</div>
			);
	}
});

module.exports = ScoreboardRow;