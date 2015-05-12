var React = require('react');
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var NavBarContent = React.createClass({
    
    render: function() {
        var props = this.props;        
        var content=[];
        switch(props.data.type)
        {            
            case 'default':
                content.push();
                break;            
        }
        return (
            <div className="" key={props.enabled}>                
                {content}                    
            </div>
        );
    }
});

var NavBar = React.createClass({

	render: function() {
		var navbar = [];
		if(this.state.enabled) {
            navbar.push(<NavBarContent {...this.state}/>);
        }
		return (
			<ReactCSSTransitionGroup transitionName="">
				{navbar}
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = NavBar;