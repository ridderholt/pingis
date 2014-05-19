/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key')

var selectbox = React.createClass({
	render: function(){
		var _this = this;
		var options = this.props.items.map(function(item){
			var isSelected = item.value === _this.props.selectedValue;
			return <option key={ReactKey.key()} selected={isSelected} value={item.value}>{item.text}</option>
		});
		return (
				<select onChange={this.props.onChange} className="form-control">
					{options}
				</select>
			);
	}
});

module.exports = selectbox;