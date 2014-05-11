(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = require('./headerModel'),
	PlayerForm = require('./playerForm');

React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: 'http://localhost:1337/Player',
		isActive: true
	},
	{
		name: 'Spela match',
		url: '/',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(PlayerForm(), document.getElementById('player-form'));

},{"./headerModel":2,"./playerForm":5}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return MenuItem( {name:item.name, href:item.url, isActive:item.isActive} )
		});
		return (
				React.DOM.div( {className:"header"}, 
					React.DOM.ul( {className:"nav nav-pills pull-right"}, 
						items
					),
					React.DOM.h3( {className:"text-muted"}, this.props.projectName)
				)
			);
	}
});


},{"./menuItem":3}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';					

module.exports = React.createClass({displayName: 'exports',
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
				React.DOM.p( {className:css}, this.props.message)
			);
	}
});

},{}],5:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var Message = require('./messageModel');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {
			firstname: '',
			lastname: '',
			showError: false,
			showSuccess: false
		};
	},
	onFirsnameChange: function(e){
		this.setState({firstname: e.target.value});
	},
	onLastnameChange: function(e){
		this.setState({lastname: e.target.value});
	},
	onSubmit: function(e){
		e.preventDefault();
		var _this = this;
		console.log(JSON.stringify(this.state));
		$.post('http://localhost:1337/player', JSON.stringify(this.state), function(){
			_this.setState({showSuccess: true});
		}, 'json').fail(function(){
			_this.setState({showError:true});
		});
	},
	render: function(){
		return (
				React.DOM.form( {className:"form-horizontal", onSubmit:this.onSubmit, role:"form"}, 
					Message( {show:this.state.showSuccess, messageType:"bg-success", message:"Spelaren är sparad"} ),
					Message( {show:this.state.showError, messageType:"bg-danger", message:"Ett fel uppstod"} ),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"firstname", className:"col-sm-2 control-label"}, "Förnamn"),
						React.DOM.div( {className:"col-sm-10"}, 
							React.DOM.input( {type:"text", onChange:this.onFirsnameChange, className:"form-control", placeholder:"Förnamn", id:"firstname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.label( {for:"lastname", className:"col-sm-2 control-label"}, "Efternamn"),
						React.DOM.div( {className:"col-sm-10"}, 
							React.DOM.input( {type:"text", onChange:this.onLastnameChange, className:"form-control", placeholder:"Efternamn", id:"lastname"} )
						)
					),
					React.DOM.div( {className:"form-group"}, 
						React.DOM.div( {className:"col-sm-offset-2 col-sm-10"}, 
							React.DOM.button( {type:"submit", className:"btn btn-default"}, "Spara")
						)
					)
				)
			);
	}
});

},{"./messageModel":4}]},{},[1])