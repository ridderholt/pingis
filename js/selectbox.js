/** @jsx React.DOM */
'use strict';

var selectbox = React.createClass({
	render: function(){
		var options = this.props.items.map(function(item){
			return <option value={item.value}>{item.text}</option>
		});
		return (
				<select>
					{options}
				</select>
			);
	}
});

module.exports = selectbox;