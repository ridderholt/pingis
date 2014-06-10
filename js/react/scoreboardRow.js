/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
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
				React.DOM.tr(null, 
					React.DOM.td(null, "#",this.props.data.position),
					React.DOM.td(null, 
						React.DOM.div( {style:imgDivStyle}, 
							React.DOM.img( {style:imgStyle, src:this.props.data.imageUrl} )
						)
					),
					React.DOM.td(null, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, "Vinster: ", this.props.data.wins, " Förluser: ", this.props.data.losses, " Obesegrad: ", this.props.data.winStreak)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;