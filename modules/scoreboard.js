'use strict';

function Scoreboard(){

	this.players = [{
			position: 1,
			name: 'Robin Ridderholt',
			score: 173
		},
		{
			position: 2,
			name: 'Herman Oscarsson',
			score: 173
		},
		{
			position: 3,
			name: 'Oskar Gustafsson',
			score: 173
		},
		{
			position: 4,
			name: 'Johan Berglund',
			score: 173
		}
		];

	this.get = function(){
		return this.players;
	};

	this.add = function(player){
		this.players.push(player);
	};

}

module.exports = new Scoreboard();