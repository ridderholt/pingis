/** @jsx React.DOM */
'use strict';

var SelectBox = React.createFactory(require('./selectbox')),
	Message = React.createFactory(require('./messageModel')),
	$ = require('jQuery');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {
			players: [],
			winner: '',
			looser: '',
			saving: false,
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
		if(this.state.saving) return;

		var loader = $('.ladda-button').ladda();
		loader.ladda('start');
		this.setState({saving: true});

		var _this = this;
		$.ajax({
			url: '/api/game',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ winner: this.state.winner, looser: this.state.looser }),
			success: function(){
				loader.ladda('stop');
				_this.setState({message: {
					type: 'bg-success',
					text: 'Matchen har sparats',
					show: true,
					saving: false
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
			React.DOM.form( {onSubmit:this.onSubmit, className:"form-horizontal", role:"form"}, 
				Message( {show:this.state.message.show, messageType:this.state.message.type, message:this.state.message.text} ),
				React.DOM.div( {className:"form-group has-feedback"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.winner, onChange:this.onWinnerSelected, items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.looser, onChange:this.onLooserSelected, items:this.state.players} )
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

module.exports = gameForm;