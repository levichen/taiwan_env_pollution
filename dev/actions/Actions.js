var Reflux = require('reflux');

var actions = Reflux.createActions([
	'initNavList',

	'changeLocation',

	'initialAirQuilityData',
	'initialMoinorData'
]);

module.exports = actions;