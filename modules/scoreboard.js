'use strict';

function Scoreboard(){

	this.get = function(){
		return [{
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
	};

}

module.exports = new Scoreboard();