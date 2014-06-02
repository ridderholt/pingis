/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {
		return (
				React.DOM.tr(null, 
					React.DOM.td(null, this.props.data.position),
					React.DOM.td(null, this.props.data.name),
					React.DOM.td(null, this.props.data.wins),
					React.DOM.td(null, this.props.data.losses),
					React.DOM.td(null, this.props.data.winStreak),
					React.DOM.td(null, this.props.data.score)
				)
			);
	}
});

module.exports = ScoreboardRow;