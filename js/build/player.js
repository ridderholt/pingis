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
		url: '/Player',
		isActive: true
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(PlayerForm(), document.getElementById('player-form'));

},{"./headerModel":2,"./playerForm":5}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem'),
	ReactKey = require('./react-key');

module.exports = React.createClass({displayName: 'exports',
	getInitialState: function() {
		return {data: []};
	},
	render: function(){
		var items = this.props.menuItems.map(function(item){
			return MenuItem( {key:ReactKey.key(), name:item.name, href:item.url, isActive:item.isActive} );
		});
		return (
			 React.DOM.div( {className:"navbar navbar-fixed-top navbar-inverse", role:"navigation"}, 
				React.DOM.div( {className:"container"}, 
					React.DOM.div( {className:"navbar-header"}, 
						React.DOM.button( {type:"button", className:"navbar-toggle", 'data-toggle':"collapse", 'data-target':".navbar-collapse"}, 
							React.DOM.span( {className:"icon-bar"}),
							React.DOM.span( {className:"icon-bar"}),
							React.DOM.span( {className:"icon-bar"})
						),
						React.DOM.img( {className:"logo", src:"/img/lagetSe.png", alt:this.props.projectName} )
					),
					React.DOM.div( {className:"collapse navbar-collapse"}, 
						React.DOM.ul( {className:"nav navbar-nav"}, 
							items
						)
					)
				)
			)
			);
	}
});


},{"./menuItem":3,"./react-key":6}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

/*jshint asi: false*/

module.exports = React.createClass({displayName: 'exports',
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			React.DOM.li( {className:css}, React.DOM.a( {href:this.props.href}, this.props.name))
			);
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
		$.ajax({
			url: 'http://localhost:1337/player',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify(this.state),
			success: function(){
				_this.setState({showSuccess: true});
			},
			error: function(){
				_this.setState({showError:true});
			}
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
							React.DOM.button( {type:"submit", className:"btn btn-success"}, "Spara")
						)
					)
				)
			);
	}
});

},{"./messageModel":4}],6:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	};
}

module.exports = new ReactKey();
},{}]},{},[1])