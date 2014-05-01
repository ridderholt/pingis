var MenuItem = require('./menuItem');

var Header = React.createClass({
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		return (
			React.DOM.div({
				className: 'header',
				children: [
					React.DOM.ul({
						className: 'nav nav-pills pull-right',
						children: [
							MenuItem({ name: 'Statistik', isActive: true }),
							MenuItem({ name: 'Spela match' }),
							MenuItem({ name: 'Lägg till spelare' })]
					}),
					React.DOM.h3({
						className: 'text-muted',
						children: 'Pingisstegen'
					})]
				})
			);
	}
});

React.renderComponent(
	Header({ projectName: 'Pingisstegen' }),
	document.getElementById('headerContainer'));