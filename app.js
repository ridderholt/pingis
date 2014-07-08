'use strict';

var express = require('express'),
	app = express(),
	debug = true,
	gzippo = require('gzippo'),
	scoreboard = require('./modules/scoreboard'),
	scoreboardDetails = require('./modules/scoreboardDetails'),
	players = require('./modules/players'),
	games = require('./modules/game'),
	bodyParser = require('body-parser'),
	spawn = require('child_process').spawn,
	maxAgeParam = (14*24*60*60*1000),
	fs = require('fs');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser({limit: '50mb'}));

if(debug){
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/js', express.static(__dirname + '/js/build'));
	app.use('/img', express.static(__dirname + '/img'));
	app.use('/uploads', express.static(__dirname + '/uploads'));
	app.use('/fonts', express.static(__dirname + '/fonts'));
} else {
	app.use('/css', gzippo.staticGzip(__dirname + '/css/dist', {maxAge: maxAgeParam}));
	app.use('/js', gzippo.staticGzip(__dirname + '/js/dist', {maxAge: maxAgeParam}));
	app.use('/img', gzippo.staticGzip(__dirname + '/img', {maxAge: maxAgeParam}));
	app.use('/uploads', gzippo.staticGzip(__dirname + '/uploads', {maxAge: maxAgeParam}));
	app.use('/fonts', gzippo.staticGzip(__dirname + '/fonts', {maxAge: maxAgeParam}));
	app.use(gzippo.compress());
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

	var base64Data = req.body.imageUrl.replace(/^data:image\/png;base64,/, "").replace(/^data:image\/jpeg;base64,/, ""),
		photoName = req.body.firstname + '_' + req.body.lastname;

	if(req.body.imageType === 'image/jpeg'){
		photoName += '.jpg';
	} else if(req.body.imageType === 'image/png'){
		photoName += '.png';
	}

	fs.writeFile('./uploads/' + photoName, new Buffer(base64Data, 'base64'), function(err){
		if(err){
			res.send(500);
		} else {
			players.add({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				imageUrl: '/uploads/' + photoName
			});

			res.send(200);
		}
	});
});


app.get('/api/scoreboard', function(req, res){
	scoreboard.get(function(results){
		res.json(results);
	});
});

app.get('/api/scoreboard/details/:id', function(req, res){
	scoreboardDetails.get(req.params.id, function(err, details){
		if(err){
			console.log(err);
			res.send(500);
		}

		res.json(details);
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