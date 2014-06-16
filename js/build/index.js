(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var Header = require('./headerModel'),
	ScoreboardTable = require('./scoreboardTable');

React.renderComponent(
	Header({ projectName: 'Pingisstegen', menuItems: [
	{
		name: 'Statistik',
		url: '/',
		isActive: true
	},
	{
		name: 'Ny spelare',
		url: '/Player',
		isActive: false
	},
	{
		name: 'Spela match',
		url: '/Game',
		isActive: false
	}
	] }),
	document.getElementById('headerContainer'));

React.renderComponent(
	ScoreboardTable({ source: '/api/scoreboard' }),
	document.getElementById('scoreboard-contaier'));

},{"./headerModel":2,"./scoreboardTable":6}],2:[function(require,module,exports){
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


},{"./menuItem":3,"./react-key":4}],3:[function(require,module,exports){
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
'use strict';

function ReactKey(){
	this.key = function(){
		return Math.random() * 10000;
	};
}

module.exports = new ReactKey();
},{}],5:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	render: function () {

		var imgDivStyle = {
			borderRadius: '50px',
			position: 'relative',
			overflow: 'hidden',
			width: '100px',
			height: '100px'
		};

		var imgStyle = {
			width: '100px'
		};

		return (
				React.DOM.tr(null, 
					React.DOM.td(null, "#",this.props.data.position),
					React.DOM.td(null, 
						React.DOM.div( {style:imgDivStyle}, 
							React.DOM.img( {style:imgStyle, src:this.props.data.imageUrl} )
						)
					),
					React.DOM.td(null, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluser: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;
},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var ScoreboardRow = require('./scoreboardRow'),
	ReactKey = require('./react-key'),
	$ = (window.$);

var ScoreboardTable = React.createClass({displayName: 'ScoreboardTable',
	getInitialState: function() {
		return {
			rows: []
		};
 	},
	componentDidMount: function() {
		$.getJSON(this.props.source, function(result) {
			this.setState({
				rows: result
			});
		}.bind(this));
	},
	render: function(){
		var rows = this.state.rows.map(function(row){
			return ScoreboardRow( {key:ReactKey.key(), data:row});
		});
		return (
			React.DOM.table( {className:"scoreboard table table-striped"}, 
				React.DOM.thead(null, 
					React.DOM.tr(null, 
						React.DOM.th(null, " "),
						React.DOM.th(null, " "),
						React.DOM.th(null, " ")
					)
				),
				React.DOM.tbody(null, 
					rows
				)
			)
			);
	}
});

module.exports = ScoreboardTable;

},{"./react-key":4,"./scoreboardRow":5}]},{},[1])