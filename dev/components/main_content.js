var React = require('react');
var Reflux = require('reflux');
var MainContentStore = require('../stores/MainContentStore');
var Content = require('./chart/content');
var SearchResult = require('./search_result');

var MainContent = React.createClass({
	mixins: [Reflux.connect(MainContentStore)],
	render: function() {
		var title = this.state.contentTitle;
		return (
			<div id="container">
				<div className="content-title"><span>{title}</span></div>
				<SearchResult />
				<Content />
			</div>
		);
	}

});

module.exports = MainContent;
