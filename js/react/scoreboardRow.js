/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {
		return (
				React.DOM.tr(null, 
					React.DOM.td(null, "#",this.props.data.position),
					React.DOM.td(null, 
						React.DOM.div( {className:"img-container"}, 
							React.DOM.img( {src:this.props.data.imageUrl} )
						)
					),
					React.DOM.td(null, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluser: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;