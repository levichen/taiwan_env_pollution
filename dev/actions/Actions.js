var Reflux = require('reflux');

var actions = Reflux.createActions([
	'initNavList',

	'changeLocation',

	'initialAirQuilityData',
	'initialMoinorData',

	'navBarSelectedData'
]);

module.exports = actions;