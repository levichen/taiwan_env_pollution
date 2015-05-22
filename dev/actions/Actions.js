var Reflux = require('reflux');

var actions = Reflux.createActions([
	'initNavList',

	'changeLocation',

	'initialAirQuilityData',

	'navBarSelectedData'
]);

module.exports = actions;