'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	Players = require('./players'),
	players = new Players();

function Scoreboards(){
	var self = this;

	var getSortOptions = function(){
		return {
			sort: [['score', 'desc'], ['winStreak', 'desc'], ['wins', 'desc'], ['losses', 'asc']]
		};
	};

	var addPosition = function(boards){
		for(var i = 0; i < boards.length; i += 1){
			boards[i].position = (i + 1);
		}
	};

	self.get = function(callback){
		var options = getSortOptions();
		db.connect(function(connection){
				 connection.collection('scoreboards')
										.find({}, options)
										.toArray(function(err, results){
											addPosition(results);
											callback(results);
										});
		});
	};

	self.create = function(playerId, callback){
		var board = {
			name: '',
			score: 0,
			wins: 0,
			losses: 0,
			winStreak: 0,
			playerId: new ObjectId(playerId)
		};

		players.get(playerId, function(err, player){
			board.name = player.firstname + ' ' + player.lastname;
			board.imageUrl = player.imageUrl;
			callback(err, board);
		});
	};

	return self;
}

module.exports = new Scoreboards();