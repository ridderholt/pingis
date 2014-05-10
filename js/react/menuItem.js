'use strict';


/*global module:true, React: true*/

module.exports = React.createClass({
	render: function(){
		return (
			React.DOM.li({
				className: this.props.isActive === true ? 'active' : '',
				children: React.DOM.a({
					href: this.props.href,
					children: this.props.name
				})
			}));
	}
});