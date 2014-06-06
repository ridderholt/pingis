'use strict';

var fs = require('fs');


setTimeout(function(){
	fs.writeFile('./test.txt', 'I ran!', function(err){
		if(err){
			throw err;
		}
	});
}, 3000);

