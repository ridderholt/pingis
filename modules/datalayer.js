'use strict';

var scoreboard = require('./scoreboard');

function Datalayer () {
	
	this.scoreboard = scoreboard;

	return this;
}

module.exports = new Datalayer();