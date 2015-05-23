var React = require('react');
var Reflux = require('reflux');
var SearchStore = require('../stores/search_store');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var SearchDetail = React.createClass({
	render: function() {
        return (
            <div id="search-content">

            </div>
        );
    }
});

var SearchContent = React.createClass({
	mixins: [Reflux.connect(SearchStore)],
	render: function() {
		var content = [];
        if(this.state.enabled) {
            content.push(<SearchDetail {...this.state}/>);
        }
		return (
			<ReactCSSTransitionGroup transitionName="searchDialog">
				{content}				
			</ReactCSSTransitionGroup>
		);
	}

});

module.exports = SearchContent;
