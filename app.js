var express = require('express'),
	app = express(),
	debug = true;

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


var server = app.listen(1337, function(){
	console.log('Server is up');
});