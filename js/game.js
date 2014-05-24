'use strict';

var Header = require('./headerModel'),
	GameForm = require('./gameForm');


React.renderComponent(
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

React.renderComponent(
	new GameForm({ source: '/api/players' }),
	document.getElementById('game-container'));