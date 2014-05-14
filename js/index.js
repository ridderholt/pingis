'use strict';

var Header = require('./headerModel');

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