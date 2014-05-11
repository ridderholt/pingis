/** @jsx React.DOM */
'use strict';					

module.exports = React.createClass({
	getInitialState: function(){
		return {
			show: false,
			messageType: 'bg-primary',
			message: ''
		};
	},
	render: function(){
		var css = this.props.messageType;
		if(this.props.show !== true){
			css += ' hidden';
		}
		return(
				<p className={css}>{this.props.message}</p>
			);
	}
});
