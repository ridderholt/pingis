'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	_ = require('lodash');


function Players(emitter){
	var self = this;
	self.eventEmitter = emitter;

	self.add = function(player){
		db.connect(function(connection){
			var players = connection.collection('players');
			players.insert(player, function(err){
				connection.close();
				if(self.eventEmitter){
					self.eventEmitter.emit('onPlayerAdded');
				}
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

module.exports = Players;