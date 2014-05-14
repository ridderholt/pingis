/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox');

var gameForm = React.createClass({
	getInitialState: function(){
		return {

		};
	},
	render: function(){
		return (
			<form className="form-horizontal" role="form">
				<div className="form-group">
					<label htmlFor="winner" className="col-sm-2 control-label">Vinnare</label>
					<div className="col-sm-10">
						<SelectBox items={[{ text: 'Robin Ridderholt', value: 1 }]} />
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="looser" className="col-sm-2 control-label">Förlorare</label>
					<div className="col-sm-10">
						<SelectBox items={[{ text: 'Robin Ridderholt', value: 1 }]} />
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