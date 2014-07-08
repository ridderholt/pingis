(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Message = require('./messageModel'),
	ImageValidator = require('./imageValidator');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {
			firstname: '',
			lastname: '',
			imageUrl: '/img/no-profile.png',
			imageType: 'image/png',
			showError: false,
			showSuccess: false,
			showImageError: false,
		};
	},
	onFirsnameChange: function(e){
		this.setState({firstname: e.target.value});
	},
	onLastnameChange: function(e){
		this.setState({lastname: e.target.value});
	},
	onImageUrlChange: function(e){
		var file = e.target.files[0],
			fileReader = new FileReader(),
			_this = this;

		if(ImageValidator.isValid(file)){
			this.setState({
				showImageError: false
			});


			fileReader.onload = function(e) {
				_this.setState({
					imageUrl: e.target.result,
					imageType: file.type
				});
			};
  
			fileReader.readAsDataURL(file);  
		} else {
			this.setState({
				showImageError: true
			});
		}
		
	},
	onSubmit: function(e){
		e.preventDefault();
		var _this = this;
		$.ajax({
			url: '/api/player',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(this.state),
			success: function(){
				_this.setState({showSuccess: true});
			},
			error: function(){
				_this.setState({showError:true});
			}
		});
	},
	render: function(){
		return (
				React.DOM.form( {className:"form-horizontal", onSubmit:this.onSubmit, role:"form"}, 
					Message( {show:this.state.showSuccess, messageType:"bg-success", message:"Spelaren är sparad"} ),
					Message( {show:this.state.showError, messageType:"bg-danger", message:"Ett fel uppstod"} ),
					Message( {show:this.state.showImageError, messageType:"bg-danger", message:"Bilden är för liten. Minst 180x180px"} ),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"firstname", className:"col-sm-2 control-label"}, "Förnamn"),
						React.DOM.div( {className:"col-sm-10"}, 
							React.DOM.input( {type:"text", onChange:this.onFirsnameChange, className:"form-control", placeholder:"Förnamn", id:"firstname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"lastname", className:"col-sm-2 control-label"}, "Efternamn"),
						React.DOM.div( {className:"col-sm-10"}, 
							React.DOM.input( {type:"text", onChange:this.onLastnameChange, className:"form-control", placeholder:"Efternamn", id:"lastname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"image-url", className:"col-sm-2 control-label"}, "Bild"),
						React.DOM.div( {className:"col-sm-8"}, 
							React.DOM.input( {id:"image-url", name:"image-url", type:"file", onChange:this.onImageUrlChange, className:"form-control"} )
						),
						React.DOM.div( {className:"col-sm-2"}, 
							React.DOM.div( {className:"img-container"}, 
								React.DOM.img( {src:this.state.imageUrl} )
							)
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.div( {className:"col-sm-offset-2 col-sm-10"}, 
							React.DOM.button( {type:"submit", className:"btn btn-success"}, "Spara")
						)
					)
				)
			);
	}
});

},{"./imageValidator":2,"./messageModel":3}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';					

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function(){
		return {
			show: false,
			messageType: 'bg-primary',
			message: ''
		};
	},
	render: function(){
		var css = this.props.messageType;
		if(this.props.show !== true){
			css += ' hidden';
		}
		return(
				React.DOM.p( {className:css}, this.props.message)
			);
	}
});

},{}]},{},[1])