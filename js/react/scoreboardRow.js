/** @jsx React.DOM */
var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {
		return (
				React.DOM.tr(null, 
					React.DOM.td(null, this.props.data.position),
					React.DOM.td(null, this.props.data.name),
					React.DOM.td(null, "10"),
					React.DOM.td(null, "2"),
					React.DOM.td(null, "7"),
					React.DOM.td(null, this.props.data.score)
				)
			);
	}
});

module.exports = ScoreboardRow;