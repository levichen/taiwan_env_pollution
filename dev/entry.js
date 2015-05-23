var React = require('react');
var MainContent = require('./components/main_content');
var NavBar = require('./components/navbar');
var SearchContent = require('./components/SearchContent');

// <NavBar />
React.render(
   	<div id="mainContainer" className="center">
   		<div className="mainContainer-bg" />
        <NavBar />
   	    <MainContent />
   	    <SearchContent />
	</div> ,
   	document.getElementsByTagName('body')[0]
);