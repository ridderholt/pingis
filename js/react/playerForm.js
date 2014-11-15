/** @jsx React.DOM */
'use strict';

var Message = require('./messageModel'),
	ImageValidator = require('./imageValidator'),
	$ = require('jQuery');

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
			saving: false,
			imgStyle: {
				backgroundImage: 'url(/img/no-profile.png)'
			}
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
					imageType: file.type,
					imgStyle: {
						backgroundImage: 'url(' + e.target.result + ')'
					}
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

		if(this.state.saving) return;

		var loader = $('.ladda-button').ladda();
		loader.ladda('start');
		this.setState({saving: true});

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
			},
			complete: function(){
				loader.ladda('stop');
				_this.setState({saving: false});
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
							React.DOM.input( {type:"text", required:true, onChange:this.onFirsnameChange, className:"form-control", placeholder:"Förnamn", id:"firstname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"lastname", className:"col-sm-2 control-label"}, "Efternamn"),
						React.DOM.div( {className:"col-sm-10"}, 
							React.DOM.input( {type:"text", required:true, onChange:this.onLastnameChange, className:"form-control", placeholder:"Efternamn", id:"lastname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"image-url", className:"col-sm-2 control-label"}, "Bild"),
						React.DOM.div( {className:"col-sm-8"}, 
							React.DOM.input( {id:"image-url", name:"image-url", type:"file", onChange:this.onImageUrlChange, className:"form-control"} )
						),
						React.DOM.div( {className:"col-sm-2"}, 
							React.DOM.div( {className:"img-container", style:this.state.imgStyle}
							)
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.div( {className:"col-sm-offset-2 col-sm-10"}, 
							React.DOM.button( {type:"submit", 'data-color':"green", 'data-size':"s", 'data-style':"expand-right", className:"ladda-button"}, 
								React.DOM.span( {className:"ladda-label"}, "Spara")
							)
						)
					)
				)
			);
	}
});
