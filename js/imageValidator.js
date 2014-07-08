'use strict';

var imageValidator = (function($){
	var self = {};

	self.isValid = function(img){
		if(img.width < 180 || img.height < 180){
			return false;
		}

		return true;
	};

	return self;
}(jQuery));

module.exports = imageValidator;