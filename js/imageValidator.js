'use strict';

var imageValidator = (function($){
	var self = {};

	self.isValid = function(url, callback){
		$('<img />').attr('src', url).load(function(){
			if(this.width < 180 || this.height < 180){
				callback(false);
				return;
			}

			callback(true);
		});
	};

	return self;
}(jQuery));

module.exports = imageValidator;