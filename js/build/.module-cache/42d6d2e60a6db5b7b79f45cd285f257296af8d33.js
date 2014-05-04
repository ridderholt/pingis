
module.exports = React.createClass({
	render: function(){
		return (
			React.DOM.li({
				className: this.props.isActive ? 'active' : '',
				children: React.DOM.a({
					href: '#',
					children: this.props.name
				})
			}));
	}
});