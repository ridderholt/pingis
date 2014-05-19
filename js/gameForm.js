/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({
	getInitialState: function(){
		return {
			players: [],
			winner: '',
			looser: ''
		};
	},
	onWinnerSelected: function(e){
		console.log(e.target.value);
		this.setState({winner: e.target.value});
	},
	onLooserSelected: function(e){
		console.log(e.target.value);
		this.setState({looser: e.target.value});
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				players: result,
			});
		}.bind(this));
	},
	render: function(){
		return (
			<form className="form-horizontal" role="form">
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
			)
	}
});

module.exports = gameForm;