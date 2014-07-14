'use strict';
var	MongoClient = require('mongodb').MongoClient,
	connectionString = 'mongodb://lagetpingis.cloudapp.net/pingpong';

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