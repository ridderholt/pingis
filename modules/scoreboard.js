'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	players = require('./players');

function Scoreboards(){
	var self = this;

	self.get = function(callback){
		db.connect(function(connection){
			var scoreboards = connection.collection('scoreboards')
										.find()
										.toArray(function(err, results){
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
			callback(err, board);
		});
	};

	return self;
}

module.exports = new Scoreboards();