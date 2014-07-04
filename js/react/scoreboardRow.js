/** @jsx React.DOM */
'use strict';

var $ = require('jQuery'),
	CssAnimation = React.addons.CSSTransitionGroup;

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	getInitialState: function(){
		return {
			showDetails: false
		}
	},
	onShowStats: function(e){
		e.preventDefault();
		this.setState({
			showDetails: true
		});
	},
	render: function () {
		var detailsCss = this.state.showDetails ? 'row col-lg-10 animated bounceInDown' : 'hidden';
		return (
				React.DOM.div( {onClick:this.onShowStats, className:"col-lg-10 latter-step"}, 
					React.DOM.div( {className:"col-lg-1 position"}, "#",this.props.data.position),
					React.DOM.div( {className:"col-lg-3"}, 
						React.DOM.div( {className:"img-container"}, 
							React.DOM.img( {src:this.props.data.imageUrl} )
						)
					),
					React.DOM.div( {className:"col-lg-6"}, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluser: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					),
					React.DOM.div( {className:detailsCss}, 
						"Testar"
					)
				)
			);
	}
});

module.exports = ScoreboardRow;