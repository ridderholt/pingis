!function e(t,a,s){function r(i,o){if(!a[i]){if(!t[i]){var c="function"==typeof require&&require;if(!o&&c)return c(i,!0);if(n)return n(i,!0);throw new Error("Cannot find module '"+i+"'")}var l=a[i]={exports:{}};t[i][0].call(l.exports,function(e){var a=t[i][1][e];return r(a?a:e)},l,l.exports,e,t,a,s)}return a[i].exports}for(var n="function"==typeof require&&require,i=0;i<s.length;i++)r(s[i]);return r}({1:[function(e){"use strict";var t=e("./headerModel"),a=e("./scoreboardTable");React.renderComponent(t({projectName:"Pingisstegen",menuItems:[{name:"Statistik",url:"/",isActive:!0},{name:"Ny spelare",url:"/Player",isActive:!1},{name:"Spela match",url:"/Game",isActive:!1}]}),document.getElementById("headerContainer")),React.renderComponent(a({source:"/api/scoreboard"}),document.getElementById("scoreboard-contaier"))},{"./headerModel":2,"./scoreboardTable":7}],2:[function(e,t){"use strict";var a=e("./menuItem"),s=e("./react-key"),r=React.createClass({displayName:"headerModel",getInitialState:function(){return{data:[]}},render:function(){var e=this.props.menuItems.map(function(e){return a({key:s.key(),name:e.name,href:e.url,isActive:e.isActive})});return React.DOM.div({className:"navbar navbar-fixed-top navbar-inverse",role:"navigation"},React.DOM.div({className:"container"},React.DOM.div({className:"navbar-header"},React.DOM.button({type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":".navbar-collapse"},React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"})),React.DOM.img({className:"logo",src:"/img/lagetSe.png",alt:this.props.projectName})),React.DOM.div({className:"collapse navbar-collapse"},React.DOM.ul({className:"nav navbar-nav"},e))))}});t.exports=r},{"./menuItem":3,"./react-key":4}],3:[function(e,t){"use strict";var a=React.createClass({displayName:"menuItem",render:function(){var e=this.props.isActive===!0?"active":"";return React.DOM.li({className:e},React.DOM.a({href:this.props.href},this.props.name))}});t.exports=a},{}],4:[function(e,t){"use strict";function a(){this.key=function(){return 1e4*Math.random()}}t.exports=new a},{}],5:[function(e,t){"use strict";var a=React.createClass({displayName:"ScoreboardDetails",render:function(){var e=this.props.details.map(function(e){return React.DOM.tr(null,React.DOM.td(null,e.opponent),React.DOM.td(null,e.wins),React.DOM.td(null,e.losses))});return React.DOM.table({className:"table"},React.DOM.thead(null,React.DOM.th(null,"Motståndare"),React.DOM.th(null,"Vinster"),React.DOM.th(null,"Förluster")),React.DOM.tbody(null,e))}});t.exports=a},{}],6:[function(e,t){"use strict";var a=window.$,s=e("./scoreboardDetails"),r=React.createClass({displayName:"ScoreboardRow",getInitialState:function(){return{showDetails:!1,playerDetails:[]}},onShowStats:function(e){e.preventDefault(),this.state.showDetails||0!==this.state.playerDetails.length?this.setState({showDetails:!this.state.showDetails}):a.getJSON("/api/scoreboard/details/"+this.props.data.playerId,function(e){this.setState({showDetails:!this.state.showDetails,playerDetails:e})}.bind(this))},render:function(){var e=this.state.showDetails?"row col-lg-10 animated zoomIn center-block":"hidden";return React.DOM.div({onClick:this.onShowStats,className:"row col-lg-10 latter-step"},React.DOM.div({className:"col-lg-1 position"},"#",this.props.data.position),React.DOM.div({className:"col-lg-3 profile"},React.DOM.div({className:"img-container"},React.DOM.img({src:this.props.data.imageUrl}))),React.DOM.div({className:"col-lg-6 scores"},this.props.data.name," (",this.props.data.score,"p)",React.DOM.br(null),React.DOM.div({className:"info"},React.DOM.span({className:"badge list-group-item-success"},"Vinster: ",this.props.data.wins),React.DOM.span({className:"badge list-group-item-danger"},"Förluster: ",this.props.data.losses),React.DOM.span({className:"badge list-group-item-info"},"Obesegrad: ",this.props.data.winStreak))),React.DOM.div({className:"col-lg-offset-2"},React.DOM.div({className:e},s({details:this.state.playerDetails}))))}});t.exports=r},{"./scoreboardDetails":5}],7:[function(e,t){"use strict";var a=e("./scoreboardRow"),s=e("./react-key"),r=window.$,n=React.createClass({displayName:"ScoreboardTable",getInitialState:function(){return{rows:[]}},componentDidMount:function(){r.getJSON(this.props.source,function(e){this.setState({rows:e})}.bind(this))},render:function(){var e=this.state.rows.map(function(e){return a({key:s.key(),data:e})});return React.DOM.div({className:"scoreboard"},e)}});t.exports=n},{"./react-key":4,"./scoreboardRow":6}]},{},[1]);