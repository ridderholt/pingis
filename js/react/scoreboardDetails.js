/** @jsx React.DOM */
'use strict';

var ScoreboardDetails = React.createClass({displayName: 'ScoreboardDetails',
	render: function(){
		var rows = this.props.details.map(function(d){
			return React.DOM.tr(null, React.DOM.td(null, d.opponent),React.DOM.td(null, d.wins),React.DOM.td(null, d.losses))
		});
		return (
			React.DOM.table( {className:"table"}, 
				React.DOM.thead(null, 
					React.DOM.th(null, "Motståndare"),
					React.DOM.th(null, "Vinster"),
					React.DOM.th(null, "Förluster")
				),
				React.DOM.tbody(null, 
					rows
				)
			)
			);
	}
});

module.exports = ScoreboardDetails;