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

},{"./headerModel":2,"./scoreboardTable":7}],2:[function(require,module,exports){
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
},{"./menuItem":3,"./react-key":4}],3:[function(require,module,exports){
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

var ScoreboardDetails = React.createClass({displayName: 'ScoreboardDetails',
	render: function(){
		var rows = this.props.details.map(function(d){
			return React.DOM.tr(null, React.DOM.td(null, d.opponent),React.DOM.td(null, d.wins),React.DOM.td(null, d.losses))
		});
		return (
			React.DOM.table( {className:"table"}, 
				React.DOM.thead(null, 
					React.DOM.th(null, "Motståndare"),
					React.DOM.th(null, "Vinster"),
					React.DOM.th(null, "Förluster")
				),
				React.DOM.tbody(null, 
					rows
				)
			)
			);
	}
});

module.exports = ScoreboardDetails;
},{}],6:[function(require,module,exports){
/** @jsx React.DOM */
'use strict';

var $ = (window.$),
	ScoreboardDetails = require('./scoreboardDetails');

var ScoreboardRow = React.createClass({displayName: 'ScoreboardRow',
	getInitialState: function(){
		return {
			showDetails: false,
			playerDetails: []
		};
	},
	onShowStats: function(e){
		e.preventDefault();

		if(!this.state.showDetails && this.state.playerDetails.length === 0){
			$.getJSON('/api/scoreboard/details/' + this.props.data.playerId, function(details){
				this.setState({
					showDetails: !this.state.showDetails,
					playerDetails: details
				});
			}.bind(this));
		} else {
			this.setState({
				showDetails: !this.state.showDetails
			});
		}
	},
	render: function () {
		var detailsCss = this.state.showDetails ? 'row col-lg-10 animated zoomIn center-block' : 'hidden';
		return (
				React.DOM.div( {onClick:this.onShowStats, className:"col-lg-10 latter-step"}, 
					React.DOM.div( {className:"col-lg-1 position"}, "#",this.props.data.position),
					React.DOM.div( {className:"col-lg-3"}, 
						React.DOM.div( {className:"img-container"}, 
							React.DOM.img( {src:this.props.data.imageUrl} )
						)
					),
					React.DOM.div( {className:"col-lg-6"}, 
						this.props.data.name, " (",this.props.data.score,"p)",React.DOM.br(null),
						React.DOM.div( {className:"info"}, 
							React.DOM.span( {className:"badge list-group-item-success"}, "Vinster: ", this.props.data.wins),
							React.DOM.span( {className:"badge list-group-item-danger"}, "Förluser: ", this.props.data.losses),
							React.DOM.span( {className:"badge list-group-item-info"}, "Obesegrad: ", this.props.data.winStreak)
						)
					),
					React.DOM.div( {className:"col-lg-offset-2"}, 
						React.DOM.div( {className:detailsCss}, 
							ScoreboardDetails( {details:this.state.playerDetails})
						)
					)
				)
			);
	}
});

module.exports = ScoreboardRow;
},{"./scoreboardDetails":5}],7:[function(require,module,exports){
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
			React.DOM.div( {className:"scoreboard"}, 
				rows
			)
			);
	}
});

module.exports = ScoreboardTable;

},{"./react-key":4,"./scoreboardRow":6}]},{},[1])