'use strict';

var Header = React.createFactory(require('./headerModel')),
	ScoreboardTable = React.createFactory(require('./scoreboardTable'));

React.render(
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

React.render(
	ScoreboardTable({ source: '/api/scoreboard' }),
	document.getElementById('scoreboard-contaier'));
