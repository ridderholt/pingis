'use strict';
var	MongoClient = require('mongodb').MongoClient,
	// connectionString = 'mongodb://127.0.0.1/pingpong';
	connectionString = 'mongodb://sa:goofy@ds050087.mongolab.com:50087/pingpong';

function Datalayer () {
	var self = this;

	self.connect = function(onConnection){
		MongoClient.connect(connectionString, function(err, db){
			if(err) throw err;
			onConnection(db);
		});
	};

	return self;
}
		
module.exports = new Datalayer();