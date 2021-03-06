/** @jsx React.DOM */
'use strict';

var $ = require('jQuery'),
	ScoreboardDetails = React.createFactory(require('./scoreboardDetails'));

var ScoreboardRow = React.createClass({
	getInitialState: function(){
		return {
			showDetails: false,
			loadingDetails: false,
			playerDetails: [],
		};
	},
	onShowStats: function(e){
		e.preventDefault();

		if(!this.state.showDetails && this.state.playerDetails.length === 0){
			this.setState({loadingDetails: true });
			$.getJSON('/api/scoreboard/details/' + this.props.data.playerId, function(details){
				this.setState({
					showDetails: !this.state.showDetails,
					playerDetails: details,
					loadingDetails: false
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
		var loadingCss = this.state.loadingDetails ? '' : 'hidden';
		var profileImage = {
			backgroundImage: 'url(' + this.props.data.imageUrl + ')'
		};
		return (
				<div onClick={this.onShowStats} className="row col-lg-10 latter-step">
					<div className="col-lg-1 position">#{this.props.data.position}</div>
					<div className="col-lg-3 profile">
						<div className="img-container" style={profileImage}></div>
					</div>
					<div className="col-lg-6 scores">
						{this.props.data.name} ({this.props.data.score}p)<br/>
						<div className="info">
							<span className="badge list-group-item-success">Vinster: {this.props.data.wins}</span>
							<span className="badge list-group-item-danger">Förluster: {this.props.data.losses}</span>
							<span className="badge list-group-item-info">Obesegrad: {this.props.data.winStreak}</span>
						</div>
					</div>
					<div className="col-lg-offset-2">
						<div className={loadingCss}>
							<div className="spinner">
							  <div className="bounce1"></div>
							  <div className="bounce2"></div>
							  <div className="bounce3"></div>
							</div>
						</div>
						<div className={detailsCss}>
							<ScoreboardDetails details={this.state.playerDetails}></ScoreboardDetails>
						</div>
					</div>
				</div>
			);
	}
});

module.exports = ScoreboardRow;
