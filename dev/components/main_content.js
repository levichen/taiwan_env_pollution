var React = require('react');
var Reflux = require('reflux');
var Content = require('./chart/Content');

var MainContent = React.createClass({

	render: function() {
		// var props = this.props;
		// var title = this.props.title;
		var title = "台北市空氣汙染圖"
		return (
			<div id="container">
				<div className="content-title"><span>{title}</span></div>
				<Content />
			</div>
		);
	}

});

module.exports = MainContent;