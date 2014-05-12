'use strict';

var db = require('./datalayer');

function Players(){
	var self = this;

	self.add = function(player){
		db.connect(function(connection){
			var players = connection.collection('players');
			players.insert(player, function(err){
				connection.close();
			});
		});
	};

	return self;
}

module.exports = new Players();