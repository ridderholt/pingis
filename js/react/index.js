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
		url: 'http://localhost:1337/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));