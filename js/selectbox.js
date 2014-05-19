/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key')

var selectbox = React.createClass({
	render: function(){
		var options = this.props.items.map(function(item){
			return <option key={ReactKey.key()} value={item.value}>{item.text}</option>
		});
		return (
				<select className="form-control">
					{options}
				</select>
			);
	}
});

module.exports = selectbox;