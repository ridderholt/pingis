'use strict';

var Header = React.createFactory(require('./headerModel')),
	PlayerForm = React.createFactory(require('./playerForm'));

React.render(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: true
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.render(PlayerForm(), document.getElementById('player-form'));
