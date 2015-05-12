var React = require('react');
var MainContent = require('../components/MainContent');
var NavBar = require('../components/NavBar');

React.render(
   	<div id="mainContainer" className="center">
        <NavBar />
   	    <MainContent />
   	 </div> ,
   	 document.getElementsByTagName('body')[0]
);