'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	players = require('./players'),
	_ = require('lodash');

function Scoreboards(){
	var self = this;

	var sortBoards = function(board){
		return -board.score;
	};

	var addPosition = function(boards){
		for(var i = 0; i < boards.length; i += 1){
			boards[i].position = (i + 1);
		}
	};

	self.get = function(callback){
		db.connect(function(connection){
			var scoreboards = connection.collection('scoreboards')
										.find()
										.toArray(function(err, results){
											var sortedBoards = _.sortBy(results, sortBoards);
											addPosition(sortedBoards);
											callback(sortedBoards);
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