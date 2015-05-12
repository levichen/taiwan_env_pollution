var React = require('react/addons');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var NavBarContent = React.createClass({
    
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
            <div id="navbar">
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