var ScoreboardRow = React.createClass({
	render: function () {
		return (

			React.DOM.tr({
				children: [
					React.DOM.td({
						children: '1'
					}),
					React.DOM.td({
						children: 'Robin'
					}),
					React.DOM.td({
						children: '173'
					})]
			})

			);
	}
});

module.exports = ScoreboardRow;