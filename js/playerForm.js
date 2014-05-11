/** @jsx React.DOM */
'use strict';

var Message = require('./messageModel');

module.exports = React.createClass({
	getInitialState: function() {
		return {
			firstname: '',
			lastname: '',
			showError: false,
			showSuccess: false
		};
	},
	onFirsnameChange: function(e){
		this.setState({firstname: e.target.value});
	},
	onLastnameChange: function(e){
		this.setState({lastname: e.target.value});
	},
	onSubmit: function(e){
		e.preventDefault();
		var _this = this;
		$.post('http://localhost:1337/player', JSON.stringify(this.state), function(){
			_this.setState({showSuccess: true});
		}, 'json').fail(function(){
			_this.setState({showError:true});
		});
	},
	render: function(){
		return (
				<form className="form-horizontal" onSubmit={this.onSubmit} role="form">
					<Message show={this.state.showSuccess} messageType="bg-success" message="Spelaren är sparad" />
					<Message show={this.state.showError} messageType="bg-danger" message="Ett fel uppstod" />
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
						<div className="col-sm-offset-2 col-sm-10">
							<button type="submit" className="btn btn-default">Spara</button>
						</div>
					</div>
				</form>
			);
	}
});
