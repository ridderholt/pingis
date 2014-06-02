/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox'),
	Message = require('./messageModel');

var gameForm = React.createClass({
	getInitialState: function(){
		return {
			players: [],
			winner: '',
			looser: '',
			message: {
				type: 'bg-success',
				text: 'Matchen har sparats',
				show: false
			}
		};
	},
	validatePlayers: function(){
		if(this.state.winner === this.state.looser){
			this.setState({message: {
				type: 'bg-danger',
				text: 'Välj två olika spelare',
				show: true
			}});
			return false;
		} else {
			this.setState({
				message: {
					show: false
				}
			});
		}
		return true;
	},
	onWinnerSelected: function(e){
		this.setState({winner: e.target.value}, function(){
			this.validatePlayers();
		});
	},
	onLooserSelected: function(e){
		this.setState({looser: e.target.value}, function(){
			this.validatePlayers();
		});
	},
	onSubmit: function(e){
		e.preventDefault();
		var _this = this;
		$.ajax({
			url: '/api/game',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ winner: this.state.winner, looser: this.state.looser }),
			success: function(){
				_this.setState({message: {
					type: 'bg-success',
					text: 'Matchen har sparats',
					show: true
				}});
			}
		});
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			result.splice(0, 0, {value: '', text: '- Välj spelare -'});
			this.setState({
				players: result,
			});
		}.bind(this));
	},
	render: function(){
		return (
			<form onSubmit={this.onSubmit} className="form-horizontal" role="form">
				<Message show={this.state.message.show} messageType={this.state.message.type} message={this.state.message.text} />
				<div className="form-group">
					<label htmlFor="winner" className="col-sm-2 control-label">Vinnare</label>
					<div className="col-sm-10">
						<SelectBox selectedValue={this.state.winner} onChange={this.onWinnerSelected} items={this.state.players} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="looser" className="col-sm-2 control-label">Förlorare</label>
					<div className="col-sm-10">
						<SelectBox selectedValue={this.state.looser} onChange={this.onLooserSelected} items={this.state.players} />
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

module.exports = gameForm;