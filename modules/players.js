'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	_ = require('lodash');


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

	self.getAll = function(callback, transformer){
		db.connect(function(connection){
			var players = connection.collection('players');

			players.find().toArray(function(err, results){
				if(err) throw err;

				if(transformer){
					var transformed = _.map(results, transformer);
					callback(transformed);
				} else{
					callback(results);
				}
			});
		});
	};

	self.get = function(id, callback, transformer){

		db.connect(function(connection){
			var players = connection.collection('players');

			players.findOne({_id: new ObjectId(id) }, function(err, item){
				console.log('Player', item);
				if(transformer){
					callback(err, transformer(item));
				} else{
					callback(err, item);
				}

				connection.close();
			});
		});

	};

	return self;
}

module.exports = new Players();