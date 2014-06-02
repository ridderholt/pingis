'use strict';
'use strict';
var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectID,
	connectionString = 'mongodb://127.0.0.1/pingpong',
	async = require('async');

function Datalayer () {
	var self = this;

	self.connect = function(){
		var scoreboards;
		var callback = function(err, results){
			console.log(results);
		};
		MongoClient.connect(connectionString, function(err, db){
			scoreboards = db.collection('scoreboards');

			var finished = function(err, results){
				console.log(results);
				db.close();
			};

			var first = function(callback){
				scoreboards.findOne({ _id: new ObjectId('53711be697f865d9732d33bd')}, function(err, item){
					callback(err, 1);
				});
			};

			var second = function(callback){
				scoreboards.findOne({ _id: new ObjectId('53711be697f865d9732d33bd')}, function(err, item){
					callback(err, 2);
				});
			};

			async.parallel([
				first,
				second
			], finished);
		});
	};

	return self;
}
		
var dl = new Datalayer();

dl.connect();