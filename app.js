'use strict';

var express = require('express'),
	app = express(),
	debug = true,
	datalayer = require('./modules/datalayer');

app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);

if(debug){
	app.use('/css', express.static(__dirname + '/css'));
	app.use('/js', express.static(__dirname + '/js/build'));
} else {
	app.use('/css', express.static(__dirname + '/css/dist'));
	app.use('/js', express.static(__dirname + '/js/dist'));
}


app.get('/', function (req, res) {
	res.render('index.html', {
		isDebug: false
	});
});

app.get('/player', function(req, res){
	res.render('player.html');
});


app.get('/api/scoreboard', function(req, res){
	res.json(datalayer.scoreboard.get());
});


var server = app.listen(1337, function(){
	console.log('Server is up');
});