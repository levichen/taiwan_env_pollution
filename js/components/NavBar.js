var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

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
        // var props = this.props;
        var content = [];

        // switch(props.data.type)
        // {            
        //     case 'default':
                content.push(123);
        //         break;            
        // }
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

	render: function() {
		var navbar = [];
		// if(this.state.enabled) {
            navbar.push(<NavBarContent {...this.state}/>);
        // }
		return (
			<ReactCSSTransitionGroup transitionName="">
				{navbar}
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = NavBar;