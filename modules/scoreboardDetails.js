'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	async = require('async'),
	_ = require('lodash');


function ScoreboardDetails () {
	var self = this;

	self.get = function(playerId, callback){
		var gamesContainer,
			playersContainer,
			games,
			players,
			details = [];

		db.connect(function(connection){

			gamesContainer = connection.collection('games');
			playersContainer = connection.collection('players');

			var dataCollected = function(err, data){
				if(err){
					connection.close();
					callback(err);
				}

				games = data[0].games;
				players = data[1].players;

				_.chain(players)
				 .filter(function(p){ return p._id.toString() !== playerId })
				 .forEach(function(p){
				 	details.push({
				 		opponent: p.firstname + ' ' + p.lastname,
				 		wins: _.filter(games, function(g){ return g.looser === p._id.toString() }).length,
				 		losses: _.filter(games, function(g){ return g.winner === p._id.toString }).length
				 	});
				 });

				 connection.close();
				 callback(undefined, details);
			};

			var getGames = function(callback){
				gamesContainer.find({ $or: [{ winner: playerId }, { looser: playerId }] })
			    .toArray(function(err, results){
			    	callback(err, { games: results });
			    });
			};

			var getPlayers = function(callback){
				playersContainer.find({}).toArray(function(err, results){
					callback(err, { players: results });
				});
			};

			async.series([
				getGames,
				getPlayers
				], dataCollected);
		});
	};

	return self;
}


module.exports = new ScoreboardDetails();