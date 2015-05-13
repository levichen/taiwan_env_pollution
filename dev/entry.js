var React = require('react');
var MainContent = require('./components/main_content');
var NavBar = require('./components/navbar');

// <NavBar />
React.render(
   	<div id="mainContainer" className="center">
   	    <MainContent />
	</div> ,
   	document.getElementsByTagName('body')[0]
);