'use strict';

var db = require('./datalayer'),
	ObjectId = require('mongodb').ObjectID,
	sb = require('./scoreboard'),
	async = require('async');

function Game(emitter){
	var self = this;

	self.eventEmitter = emitter;
	self.connection = null;

	self.onError = function(err){
		if(self.connection){
			self.connection.close();
		}

		throw err;
	};

	self.newGame = function(game, callback){
		db.connect(function(connection){
			self.connection = connection;

			self._saveGame(game, function(err){
				if(err){
					self.onError(err);
					callback();
				}

				self._updateScoreboards(game, function(err){
					if(err){
						self.onError(err);
						callback();
					}

					self.connection.close();
					callback();
					self.eventEmitter.emit('onGameSaved');
				});
			});
		});
	};

	return self;
}

Game.prototype._saveGame = function(game, callback) {
	var games = this.connection.collection('games');
	games.insert(game, function(err){
		callback(err);
	});
};

Game.prototype._getScoreboard = function(id, callback) {
	this.connection.collection('scoreboards').findOne({ playerId: new ObjectId(id) }, function(err, item){
		if(item === null){
			sb.create(id, callback);
		} else {
			callback(err, item);
		}
	});
};

Game.prototype._onScoreboards = function(winnerBoard, looserBoard) {
	if(looserBoard.score > winnerBoard.score){
		winnerBoard.score = looserBoard.score;
		looserBoard.score -= 1;
	} else {
		winnerBoard.score += 1;
		if(looserBoard.score > 0){
			looserBoard.score -= 1;
		}
	}

	looserBoard.losses += 1;
	winnerBoard.wins += 1;
	winnerBoard.winStreak += 1;
	looserBoard.winStreak = 0;
};

Game.prototype._updateScoreboards = function(game, callback) {
	var winnerBoard,
	looserBoard,
	scoreboards,
	_this = this;

	var onBoardsRecieved = function(err){
		if(err){
			callback(err);
			return;
		}

		_this._onScoreboards(winnerBoard, looserBoard);

		scoreboards = _this.connection.collection('scoreboards');

		var saveFinished = function(err){
			if(err){
				_this.onError(err);
				return;
			}

			callback(null);
		};

		var saveWinner = function(callback){
			scoreboards.save(winnerBoard, function(err){
				callback(err);
			});
		};

		var saveLooser = function(callback){
			scoreboards.save(looserBoard, function(err){
				callback(err);
			});
		};

		async.parallel([
			saveWinner,
			saveLooser
			], saveFinished);
	};

	var getWinner = function(callback){
		_this._getScoreboard(game.winner, function(err, board){
			winnerBoard = board;
			callback(err);
		});
	};

	var getLooser = function(callback){
		_this._getScoreboard(game.looser, function(err, board){
			looserBoard = board;
			callback(err);
		});
	};

	async.parallel([
		getWinner,
		getLooser
	], onBoardsRecieved);
};

module.exports = Game;