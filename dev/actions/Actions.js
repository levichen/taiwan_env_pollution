var Reflux = require('reflux');

var actions = Reflux.createActions([
	'initNavList',

	'changeLocation',
	'changeContentTitle',

	'initialAirQuilityData',

	'navBarSelectedData'
]);

module.exports = actions;