!function e(t,a,s){function r(o,i){if(!a[o]){if(!t[o]){var c="function"==typeof require&&require;if(!i&&c)return c(o,!0);if(n)return n(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=a[o]={exports:{}};t[o][0].call(l.exports,function(e){var a=t[o][1][e];return r(a?a:e)},l,l.exports,e,t,a,s)}return a[o].exports}for(var n="function"==typeof require&&require,o=0;o<s.length;o++)r(s[o]);return r}({1:[function(e){"use strict";var t=e("./headerModel"),a=e("./gameForm");React.renderComponent(new t({projectName:"Pingisstegen",menuItems:[{name:"Statistik",url:"/",isActive:!1},{name:"Ny spelare",url:"/Player",isActive:!1},{name:"Spela match",url:"/Game",isActive:!0}]}),document.getElementById("headerContainer")),React.renderComponent(new a({source:"/api/players"}),document.getElementById("game-container"))},{"./gameForm":2,"./headerModel":3}],2:[function(e,t){"use strict";var a=e("./selectbox"),s=e("./messageModel"),r=window.$,n=React.createClass({displayName:"gameForm",getInitialState:function(){return{players:[],winner:"",looser:"",saving:!1,message:{type:"bg-success",text:"Matchen har sparats",show:!1}}},validatePlayers:function(){return this.state.winner===this.state.looser?(this.setState({message:{type:"bg-danger",text:"Välj två olika spelare",show:!0}}),!1):(this.setState({message:{show:!1}}),!0)},onWinnerSelected:function(e){this.setState({winner:e.target.value},function(){this.validatePlayers()})},onLooserSelected:function(e){this.setState({looser:e.target.value},function(){this.validatePlayers()})},onSubmit:function(e){if(e.preventDefault(),!this.state.saving){var t=r(".ladda-button").ladda();t.ladda("start"),this.setState({saving:!0});var a=this;r.ajax({url:"/api/game",type:"POST",contentType:"application/json",data:JSON.stringify({winner:this.state.winner,looser:this.state.looser}),success:function(){t.ladda("stop"),a.setState({message:{type:"bg-success",text:"Matchen har sparats",show:!0,saving:!1}})}})}},componentDidMount:function(){r.getJSON(this.props.source,function(e){e.splice(0,0,{value:"",text:"- Välj spelare -"}),this.setState({players:e})}.bind(this))},render:function(){return React.DOM.form({onSubmit:this.onSubmit,className:"form-horizontal",role:"form"},s({show:this.state.message.show,messageType:this.state.message.type,message:this.state.message.text}),React.DOM.div({className:"form-group has-feedback"},React.DOM.label({htmlFor:"winner",className:"col-sm-2 control-label"},"Vinnare"),React.DOM.div({className:"col-sm-10"},a({selectedValue:this.state.winner,onChange:this.onWinnerSelected,items:this.state.players}))),React.DOM.div({className:"form-group"},React.DOM.label({htmlFor:"looser",className:"col-sm-2 control-label"},"Förlorare"),React.DOM.div({className:"col-sm-10"},a({selectedValue:this.state.looser,onChange:this.onLooserSelected,items:this.state.players}))),React.DOM.div({className:"form-group"},React.DOM.div({className:"col-sm-offset-2 col-sm-10"},React.DOM.button({type:"submit","data-color":"green","data-size":"s","data-style":"expand-right",className:"ladda-button"},React.DOM.span({className:"ladda-label"},"Spara")))))}});t.exports=n},{"./messageModel":5,"./selectbox":7}],3:[function(e,t){"use strict";var a=e("./menuItem"),s=e("./react-key"),r=React.createClass({displayName:"headerModel",getInitialState:function(){return{data:[]}},render:function(){var e=this.props.menuItems.map(function(e){return a({key:s.key(),name:e.name,href:e.url,isActive:e.isActive})});return React.DOM.div({className:"navbar navbar-fixed-top navbar-inverse",role:"navigation"},React.DOM.div({className:"container"},React.DOM.div({className:"navbar-header"},React.DOM.button({type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":".navbar-collapse"},React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"})),React.DOM.img({className:"logo",src:"/img/lagetSe.png",alt:this.props.projectName})),React.DOM.div({className:"collapse navbar-collapse"},React.DOM.ul({className:"nav navbar-nav"},e))))}});t.exports=r},{"./menuItem":4,"./react-key":6}],4:[function(e,t){"use strict";var a=React.createClass({displayName:"menuItem",render:function(){var e=this.props.isActive===!0?"active":"";return React.DOM.li({className:e},React.DOM.a({href:this.props.href},this.props.name))}});t.exports=a},{}],5:[function(e,t){"use strict";t.exports=React.createClass({displayName:"exports",getInitialState:function(){return{show:!1,messageType:"bg-primary",message:""}},render:function(){var e=this.props.messageType;return this.props.show!==!0&&(e+=" hidden"),React.DOM.p({className:e},this.props.message)}})},{}],6:[function(e,t){"use strict";function a(){this.key=function(){return 1e4*Math.random()}}t.exports=new a},{}],7:[function(e,t){"use strict";var a=e("./react-key"),s=React.createClass({displayName:"selectbox",render:function(){var e=this,t=this.props.items.map(function(t){var s=t.value===e.props.selectedValue;return React.DOM.option({key:a.key(),selected:s,defaultValue:e.props.selectedValue,value:t.value},t.text)});return React.DOM.select({onChange:this.props.onChange,className:"form-control"},t)}});t.exports=s},{"./react-key":6}]},{},[1]);