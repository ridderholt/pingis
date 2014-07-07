(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = require('./headerModel'),
	GameForm = require('./gameForm');


React.renderComponent(
	new Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: false
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: true
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(
	new GameForm({ source: '/api/players' }),
	document.getElementById('game-container'));
},{"./gameForm":2,"./headerModel":3}],2:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var SelectBox = require('./selectbox'),
	Message = require('./messageModel');

var gameForm = React.createClass({displayName: 'gameForm',
	getInitialState: function(){
		return {
			players: [],
			winner: '',
			looser: '',
			message: {
				type: 'bg-success',
				text: 'Matchen har sparats',
				show: false
			}
		};
	},
	validatePlayers: function(){
		if(this.state.winner === this.state.looser){
			this.setState({message: {
				type: 'bg-danger',
				text: 'Välj två olika spelare',
				show: true
			}});
			return false;
		} else {
			this.setState({
				message: {
					show: false
				}
			});
		}
		return true;
	},
	onWinnerSelected: function(e){
		this.setState({winner: e.target.value}, function(){
			this.validatePlayers();
		});
	},
	onLooserSelected: function(e){
		this.setState({looser: e.target.value}, function(){
			this.validatePlayers();
		});
	},
	onSubmit: function(e){
		e.preventDefault();
		var _this = this;
		$.ajax({
			url: '/api/game',
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ winner: this.state.winner, looser: this.state.looser }),
			success: function(){
				_this.setState({message: {
					type: 'bg-success',
					text: 'Matchen har sparats',
					show: true
				}});
			}
		});
	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			result.splice(0, 0, {value: '', text: '- Välj spelare -'});
			this.setState({
				players: result,
			});
		}.bind(this));
	},
	render: function(){
		return (
			React.DOM.form( {onSubmit:this.onSubmit, className:"form-horizontal", role:"form"}, 
				Message( {show:this.state.message.show, messageType:this.state.message.type, message:this.state.message.text} ),
				React.DOM.div( {className:"form-group has-feedback"}, 
					React.DOM.label( {htmlFor:"winner", className:"col-sm-2 control-label"}, "Vinnare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.winner, onChange:this.onWinnerSelected, items:this.state.players} )
					)
				),
				React.DOM.div( {className:"form-group"}, 
					React.DOM.label( {htmlFor:"looser", className:"col-sm-2 control-label"}, "Förlorare"),
					React.DOM.div( {className:"col-sm-10"}, 
						SelectBox( {selectedValue:this.state.looser, onChange:this.onLooserSelected, items:this.state.players} )
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

module.exports = gameForm;
},{"./messageModel":5,"./selectbox":7}],3:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';
var MenuItem = require('./menuItem'),
	ReactKey = require('./react-key');

var headerModel = React.createClass({displayName: 'headerModel',
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

module.exports = headerModel;
},{"./menuItem":4,"./react-key":6}],4:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

/*jshint asi: false*/

var menuItem = React.createClass({displayName: 'menuItem',
	render: function(){
		var css = this.props.isActive === true ? 'active' : '';
		return (
			React.DOM.li( {className:css}, React.DOM.a( {href:this.props.href}, this.props.name))
			);
	}
});

module.exports = menuItem;
},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	};
}

module.exports = new ReactKey();
},{}],7:[function(require,module,exports){
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
				React.DOM.select( {onChange:this.props.onChange, className:"form-control"}, 
					options
				)
			);
	}
});

module.exports = selectbox;
},{"./react-key":6}]},{},[1])