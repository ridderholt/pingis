'use strict';

var db = require('./datalayer');

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

	return self;
}

module.exports = new Scoreboards();