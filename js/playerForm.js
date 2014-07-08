/** @jsx React.DOM */
'use strict';

var Message = require('./messageModel'),
	ImageValidator = require('./imageValidator');

module.exports = React.createClass({
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
				<form className="form-horizontal" onSubmit={this.onSubmit} role="form">
					<Message show={this.state.showSuccess} messageType="bg-success" message="Spelaren är sparad" />
					<Message show={this.state.showError} messageType="bg-danger" message="Ett fel uppstod" />
					<Message show={this.state.showImageError} messageType="bg-danger" message="Bilden är för liten. Minst 180x180px" />
					<div className="form-group">
						<label for="firstname" className="col-sm-2 control-label">Förnamn</label>
						<div className="col-sm-10">
							<input type="text" onChange={this.onFirsnameChange} className="form-control" placeholder="Förnamn" id="firstname" />
						</div>
					</div>
					<div className="form-group">
						<label for="lastname" className="col-sm-2 control-label">Efternamn</label>
						<div className="col-sm-10">
							<input type="text" onChange={this.onLastnameChange} className="form-control" placeholder="Efternamn" id="lastname" />
						</div>
					</div>
					<div className="form-group">
						<label for="image-url" className="col-sm-2 control-label">Bild</label>
						<div className="col-sm-8">
							<input id="image-url" name="image-url" type="file" onChange={this.onImageUrlChange} className="form-control" />
						</div>
						<div className="col-sm-2">
							<div className="img-container">
								<img src={this.state.imageUrl} />
							</div>
						</div>
					</div>
					<div className="form-group">
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" className="btn btn-success">Spara</button>
						</div>
					</div>
				</form>
			);
	}
});
