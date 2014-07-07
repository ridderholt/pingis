'use strict';
'use strict';
var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectID,
	connectionString = 'mongodb://127.0.0.1/pingpong',
	async = require('async'),
	_ = require('lodash');

function Datalayer () {
	var self = this;

	self.connect = function(){
		var games,
			players,
			playerId;
		MongoClient.connect(connectionString, function(err, db){
			games = db.collection('games'),
			players = db.collection('players'),
			playerId = '53b97e5847a70b9c058775e4';


			var dataCollected = function(err, results){
				var myGames = results[0].games,
					myPlayers = results[1].players;

				var list = [];

				_.chain(myPlayers)
				 .filter(function(p){ return p._id.toString() !== playerId })
				 .forEach(function(p){
				 	list.push({
				 		oponent: p.firstname + ' ' + p.lastname,
				 		wins: _.filter(myGames, function(g){ return g.looser === p._id.toString() }).length,
				 		losses: _.filter(myGames, function(g){ return g.winner === p._id.toString() }).length
				 	});
				 });

				 console.log(list);

				db.close();
			};

			var getGames = function(callback){

				games.find({ $or: [{ winner: '53b97e5847a70b9c058775e4' }, { looser: '53b97e5847a70b9c058775e4' }] })
				.toArray(function(err, results){
					callback(err, { games: results });
				});
			};

			var getPlayers = function(callback){
				players.find({}).toArray(function(err, results){
					callback(err, {players: results});
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
		
var dl = new Datalayer();

dl.connect();