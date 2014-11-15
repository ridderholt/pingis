'use strict';
'use strict';
var mongodb = require('mongodb'),
	MongoClient = mongodb.MongoClient,
	ObjectId = mongodb.ObjectID,
	connectionString = 'mongodb://lagetpingis.cloudapp.net/pingpong';

function Datalayer () {
	var self = this;

	self.connect = function(){
		MongoClient.connect(connectionString, function(err, db){
			db.collection('players').remove({}, function(err){
				console.log('Players removed');
			});
		});
	};

	return self;
}
		
var dl = new Datalayer();

dl.connect();
