/** @jsx React.DOM */
'use strict';

var ReactKey = require('./react-key');

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var _this = this;
		var options = this.props.items.map(function(item){
			var isSelected = item.value === _this.props.selectedValue;
			return React.DOM.option( {key:ReactKey.key(), selected:isSelected, defaultValue:_this.props.selectedValue, value:item.value}, item.text);
		});
		return (
				React.DOM.select( {required:true, onChange:this.props.onChange, className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
