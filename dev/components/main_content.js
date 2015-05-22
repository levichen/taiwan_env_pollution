var React = require('react');
var Reflux = require('reflux');
var Content = require('./chart/content');

var MainContent = React.createClass({

	render: function() {
		// var props = this.props;
		// var title = this.props.title;
		var title = "台灣環境汙染圖"
		return (
			<div id="container">
				<div className="content-title"><span>{title}</span></div>
				<Content />
			</div>
		);
	}

});

module.exports = MainContent;
