'use strict';

var express = require('express'),
	app = express(),
	debug = true,
	gzippo = require('gzippo'),
	events = require('events'),
	emitter = new events.EventEmitter(),
	scoreboard = require('./modules/scoreboard'),
	scoreboardDetails = require('./modules/scoreboardDetails'),
	Players = require('./modules/players'),
	players = new Players(emitter),
	Game = require('./modules/game'),
	games = new Game(emitter),
	bodyParser = require('body-parser'),
	spawn = require('child_process').spawn,
	maxAgeParam = (14*24*60*60*1000),
	fs = require('fs'),
	Cache = require('mem-cache'),
	cache = new Cache({timeoutDisabled: true});

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(bodyParser({limit: '50mb'}));

if(process.env.DEBUG){
	debug = process.env.DEBUG === 'True' ? true : false;
} else {
	debug = true;
}

if(debug){
	console.log('Site started in DEBUG mode');
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/js', express.static(__dirname + '/js/build'));
	app.use('/lib', express.static(__dirname + '/lib'));
	app.use('/img', express.static(__dirname + '/img'));
	app.use('/uploads', express.static(__dirname + '/uploads'));
	app.use('/fonts', express.static(__dirname + '/fonts'));
} else {
	console.log('Site started in RELEASE mode');
	app.use('/css', gzippo.staticGzip(__dirname + '/css/dist', {maxAge: maxAgeParam}));
	app.use('/js', gzippo.staticGzip(__dirname + '/js/dist', {maxAge: maxAgeParam}));
	app.use('/lib', gzippo.staticGzip(__dirname + '/lib', {maxAge: maxAgeParam}));
	app.use('/img', gzippo.staticGzip(__dirname + '/img', {maxAge: maxAgeParam}));
	app.use('/uploads', gzippo.staticGzip(__dirname + '/uploads', {maxAge: maxAgeParam}));
	app.use('/fonts', gzippo.staticGzip(__dirname + '/fonts', {maxAge: maxAgeParam}));
	app.use(gzippo.compress());
}


app.get('/', function (req, res) {
	res.render('index.html', { isDebug: debug });
});

app.get('/player', function(req, res){
	res.render('player.html', { isDebug: debug });
});

app.get('/game', function(req, res){
	res.render('game.html', { isDebug: debug });
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

var getScoreboards = function(callback){
	scoreboard.get(function(results){
		cache.set('scoreboard', results);
		if(callback){
			callback(results);
		}
	});
};

app.get('/api/scoreboard', function(req, res){

	if(cache.get('scoreboard')){
		res.json(cache.get('scoreboard'));
	} else {
		getScoreboards(function(data){
			res.json(data);
		});
	}
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

var getAllPlayers = function(callback){
	players.getAll(function(data){
		cache.set('players', data);
		if(callback){
			callback(data);
		}
	}, function(player){
		return { text: player.firstname + ' ' + player.lastname, value: player._id };
	});
}

app.get('/api/players', function(req, res){

	if(cache.get('players')){
		res.json(cache.get('players'));
	} else{
		getAllPlayers(function(data){
			res.json(data);
		});
	}
});

app.post('/api/game', function(req, res){
	games.newGame({ winner: req.body.winner, looser: req.body.looser }, function(){
		res.send(200);
	});
});

app.use(function(req, res){
	res.render('404.html');
});

app.use(function(error, req, res){
	res.render('500.html');
});

var server = app.listen(1337, function(){
	console.log('Server is up');
	getScoreboards();
	getAllPlayers();

	emitter.on('onGameSaved', function(){
		getScoreboards();
	});

	emitter.on('onPlayerAdded', function(){
		cache.remove('players');
	});
});
