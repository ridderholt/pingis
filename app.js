'use strict';

var express = require('express'),
	app = express(),
	debug = true,
	scoreboard = require('./modules/scoreboard'),
	players = require('./modules/players'),
	bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser());

if(debug){
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/js', express.static(__dirname + '/js/build'));
	app.use('/img', express.static(__dirname + '/img'));
} else {
	app.use('/css', express.static(__dirname + '/css/dist'));
	app.use('/js', express.static(__dirname + '/js/dist'));
	app.use('/img', express.static(__dirname + '/img'));
}


app.get('/', function (req, res) {
	res.render('index.html');
});

app.get('/player', function(req, res){
	res.render('player.html');
});

app.get('/game', function(req, res){
	res.render('game.html');
});

app.post('/player', function(req, res){
	console.log(req.body);

	players.add({
		firstname: req.body.firstname,
		lastname: req.body.lastname
	});

	res.send(200);
});


app.get('/api/scoreboard', function(req, res){
	scoreboard.get(function(results){
		res.json(results);
	});
});


var server = app.listen(1337, function(){
	console.log('Server is up');
});