'use strict';

var Header = require('./headerModel'),
	ScoreboardTable = require('./scoreboardTable');

React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: true
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(
	ScoreboardTable({ source: '/api/scoreboard' }),
	document.getElementById('scoreboard-contaier'));
