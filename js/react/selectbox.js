/** @jsx React.DOM */
'use strict';

var selectbox = React.createClass({displayName: 'selectbox',
	render: function(){
		var options = this.props.items.map(function(item){
			return React.DOM.option( {value:item.value}, item.text)
		});
		return (
				React.DOM.select( {className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;