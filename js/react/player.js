'use strict';

var Header = require('./headerModel'),
	PlayerForm = require('./playerForm');

React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: 'http://localhost:1337/Player',
		isActive: true
	},
	{
		name: 'Spela match',
		url: '/',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(PlayerForm(), document.getElementById('player-form'));
