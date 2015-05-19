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

        this.refs.searchClick.getDOMNode().addEventListener('click', function() {
            var search_val = document.getElementById("search-val").value;
            /* call action */
        });
    },
    renderContent: function() {
        var content = this.props.navList.map(function(listData) {
            var attr = {};
            attr.listType = listData.type;
            attr.listTitle = listData.title;
            attr.listSub = listData.sub;

            return (
                <NavBarContentBox {...attr} />
            );
        });

        return {content};
    },
    render: function() {
        return (
            <div id="navbar" className="animate-all">
                <div className="nav-mark" ref="navMarkClick">
                    <div className="icon-menu-white" />
                </div>
                <div className="search-box">
                    <div className="center"><input type="text" id="search-val" /></div>
                    <div className="center"><input type="button" value="Search"  ref="searchClick" /></div>
                </div>
                {this.renderContent()}
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