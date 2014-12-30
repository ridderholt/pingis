'use strict';

var Header = React.createFactory(require('./headerModel')),
	GameForm = React.createFactory(require('./gameForm'));


React.render(
	new Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: true
	}
	] }),
	document.getElementById('headerContainer'));

React.render(
	new GameForm({ source: '/api/players' }),
	document.getElementById('game-container'));