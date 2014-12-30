/** @jsx React.DOM */
'use strict';

var $ = require('jQuery'),
	ScoreboardDetails = React.createFactory(require('./scoreboardDetails'));

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
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
				React.DOM.div( {onClick:this.onShowStats, className:"row col-lg-10 latter-step"}, 
					React.DOM.div( {className:"col-lg-1 position"}, "#",this.props.data.position),
					React.DOM.div( {className:"col-lg-3 profile"}, 
						React.DOM.div( {className:"img-container", style:profileImage})
					),
					React.DOM.div( {className:"col-lg-6 scores"}, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluster: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					),
					React.DOM.div( {className:"col-lg-offset-2"}, 
						React.DOM.div( {className:loadingCss}, 
							React.DOM.div( {className:"spinner"}, 
							  React.DOM.div( {className:"bounce1"}),
							  React.DOM.div( {className:"bounce2"}),
							  React.DOM.div( {className:"bounce3"})
							)
						),
						React.DOM.div( {className:detailsCss}, 
							ScoreboardDetails( {details:this.state.playerDetails})
						)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;
