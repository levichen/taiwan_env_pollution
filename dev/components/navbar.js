var React = require('react/addons');
var Reflux = require('reflux');
var NavBarStore = require('../stores/NavBarStore');
var NavBarContentBox = require('./navbar/nav_bar_content_box');

var NavBarContent = React.createClass({
    
    componentDidMount: function() {
        this.refs.navMarkClick.getDOMNode().addEventListener('click', function() {
            var navbar = document.getElementById("navbar");
            if(navbar.classList.contains("nav-hide")) {
                navbar.classList.remove("nav-hide");
            } else {
                navbar.classList.add("nav-hide");
            }
        });
    },
    render: function() {
        var props = this.props;
        var content = props.navList.map(function(listData) {
            var attr = {};
            attr.listType = listData.type;
            attr.listTitle = listData.title;
            attr.listSub = listData.sub;

            return (
                <NavBarContentBox {...attr} />
            );
        });        
        
        return (
            <div id="navbar" className="animate-all">
                <div className="nav-mark" ref="navMarkClick">
                    <div className="icon-menu-white" />
                </div>
                {content}                    
            </div>
        );
    }
});

var NavBar = React.createClass({
    mixins: [Reflux.connect(NavBarStore)],
	render: function() {
		var navbar = [];
		if(this.state.enabled) {
            navbar.push(<NavBarContent {...this.state}/>);
        }
		return (
            <div>
			{navbar}
            </div>
		);
	}

});

module.exports = NavBar;