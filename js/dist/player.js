!function e(a,t,s){function r(o,i){if(!t[o]){if(!a[o]){var c="function"==typeof require&&require;if(!i&&c)return c(o,!0);if(n)return n(o,!0);throw new Error("Cannot find module '"+o+"'")}var l=t[o]={exports:{}};a[o][0].call(l.exports,function(e){var t=a[o][1][e];return r(t?t:e)},l,l.exports,e,a,t,s)}return t[o].exports}for(var n="function"==typeof require&&require,o=0;o<s.length;o++)r(s[o]);return r}({1:[function(e){"use strict";var a=e("./headerModel"),t=e("./playerForm");React.renderComponent(a({projectName:"Pingisstegen",menuItems:[{name:"Statistik",url:"/",isActive:!1},{name:"Ny spelare",url:"/Player",isActive:!0},{name:"Spela match",url:"/Game",isActive:!1}]}),document.getElementById("headerContainer")),React.renderComponent(t(),document.getElementById("player-form"))},{"./headerModel":2,"./playerForm":6}],2:[function(e,a){"use strict";var t=e("./menuItem"),s=e("./react-key"),r=React.createClass({displayName:"headerModel",getInitialState:function(){return{data:[]}},render:function(){var e=this.props.menuItems.map(function(e){return t({key:s.key(),name:e.name,href:e.url,isActive:e.isActive})});return React.DOM.div({className:"navbar navbar-fixed-top navbar-inverse",role:"navigation"},React.DOM.div({className:"container"},React.DOM.div({className:"navbar-header"},React.DOM.button({type:"button",className:"navbar-toggle","data-toggle":"collapse","data-target":".navbar-collapse"},React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"}),React.DOM.span({className:"icon-bar"})),React.DOM.img({className:"logo",src:"/img/lagetSe.png",alt:this.props.projectName})),React.DOM.div({className:"collapse navbar-collapse"},React.DOM.ul({className:"nav navbar-nav"},e))))}});a.exports=r},{"./menuItem":4,"./react-key":7}],3:[function(e,a){"use strict";var t=function(){var e={};return e.isValid=function(e){return e.width<180||e.height<180?!1:!0},e}(jQuery);a.exports=t},{}],4:[function(e,a){"use strict";var t=React.createClass({displayName:"menuItem",render:function(){var e=this.props.isActive===!0?"active":"";return React.DOM.li({className:e},React.DOM.a({href:this.props.href},this.props.name))}});a.exports=t},{}],5:[function(e,a){"use strict";a.exports=React.createClass({displayName:"exports",getInitialState:function(){return{show:!1,messageType:"bg-primary",message:""}},render:function(){var e=this.props.messageType;return this.props.show!==!0&&(e+=" hidden"),React.DOM.p({className:e},this.props.message)}})},{}],6:[function(e,a){"use strict";var t=e("./messageModel"),s=e("./imageValidator"),r=window.$;a.exports=React.createClass({displayName:"exports",getInitialState:function(){return{firstname:"",lastname:"",imageUrl:"/img/no-profile.png",imageType:"image/png",showError:!1,showSuccess:!1,showImageError:!1,saving:!1}},onFirsnameChange:function(e){this.setState({firstname:e.target.value})},onLastnameChange:function(e){this.setState({lastname:e.target.value})},onImageUrlChange:function(e){var a=e.target.files[0],t=new FileReader,r=this;s.isValid(a)?(this.setState({showImageError:!1}),t.onload=function(e){r.setState({imageUrl:e.target.result,imageType:a.type})},t.readAsDataURL(a)):this.setState({showImageError:!0})},onSubmit:function(e){if(e.preventDefault(),!this.state.saving){var a=r(".ladda-button").ladda();a.ladda("start"),this.setState({saving:!0});var t=this;r.ajax({url:"/api/player",type:"POST",contentType:"application/json",data:JSON.stringify(this.state),success:function(){t.setState({showSuccess:!0})},error:function(){t.setState({showError:!0})},complete:function(){a.ladda("stop"),t.setState({saving:!1})}})}},render:function(){return React.DOM.form({className:"form-horizontal",onSubmit:this.onSubmit,role:"form"},t({show:this.state.showSuccess,messageType:"bg-success",message:"Spelaren är sparad"}),t({show:this.state.showError,messageType:"bg-danger",message:"Ett fel uppstod"}),t({show:this.state.showImageError,messageType:"bg-danger",message:"Bilden är för liten. Minst 180x180px"}),React.DOM.div({className:"form-group"},React.DOM.label({"for":"firstname",className:"col-sm-2 control-label"},"Förnamn"),React.DOM.div({className:"col-sm-10"},React.DOM.input({type:"text",onChange:this.onFirsnameChange,className:"form-control",placeholder:"Förnamn",id:"firstname"}))),React.DOM.div({className:"form-group"},React.DOM.label({"for":"lastname",className:"col-sm-2 control-label"},"Efternamn"),React.DOM.div({className:"col-sm-10"},React.DOM.input({type:"text",onChange:this.onLastnameChange,className:"form-control",placeholder:"Efternamn",id:"lastname"}))),React.DOM.div({className:"form-group"},React.DOM.label({"for":"image-url",className:"col-sm-2 control-label"},"Bild"),React.DOM.div({className:"col-sm-8"},React.DOM.input({id:"image-url",name:"image-url",type:"file",onChange:this.onImageUrlChange,className:"form-control"})),React.DOM.div({className:"col-sm-2"},React.DOM.div({className:"img-container"},React.DOM.img({src:this.state.imageUrl})))),React.DOM.div({className:"form-group"},React.DOM.div({className:"col-sm-offset-2 col-sm-10"},React.DOM.button({type:"submit","data-color":"green","data-size":"s","data-style":"expand-right",className:"ladda-button"},React.DOM.span({className:"ladda-label"},"Spara")))))}})},{"./imageValidator":3,"./messageModel":5}],7:[function(e,a){"use strict";function t(){this.key=function(){return 1e4*Math.random()}}a.exports=new t},{}]},{},[1]);