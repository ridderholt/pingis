'use strict';

var express = require('express'),
	app = express(),
	debug = true,
	scoreboard = require('./modules/scoreboard'),
	players = require('./modules/players'),
	games = require('./modules/game'),
	bodyParser = require('body-parser'),
	spawn = require('child_process').spawn;

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser());

if(debug){
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/js', express.static(__dirname + '/js/build'));
	app.use('/img', express.static(__dirname + '/img'));
	app.use('/fonts', express.static(__dirname + '/fonts'));
} else {
	app.use('/css', express.static(__dirname + '/css/dist'));
	app.use('/js', express.static(__dirname + '/js/dist'));
	app.use('/img', express.static(__dirname + '/img'));
	app.use('/fonts', express.static(__dirname + '/fonts'));
}


app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/player', function(req, res){
	res.render('player.html');
});

app.get('/test', function(req, res){
	res.render('test.html');
});

app.get('/game', function(req, res){
	res.render('game.html');
});

app.post('/api/player', function(req, res){
	players.add({
		firstname: req.body.firstname,
		lastname: req.body.lastname,
		imageUrl: req.body.imageUrl
	});

	res.send(200);
});


app.get('/api/scoreboard', function(req, res){
	scoreboard.get(function(results){
		res.json(results);
	});
});

app.get('/api/players', function(req, res){
	players.getAll(function(data){
		res.json(data);
	}, function(player){
		return { text: player.firstname + ' ' + player.lastname, value: player._id };
	});
});

app.post('/api/game', function(req, res){
	games.newGame({ winner: req.body.winner, looser: req.body.looser }, function(){
		res.send(200);
	});
});

app.get('/api/test', function(req, res){
	spawn('node', ['modules/task.js']);
	res.send(200);
});

var server = app.listen(1337, function(){
	console.log('Server is up');
});