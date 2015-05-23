var Reflux = require('reflux');

var actions = Reflux.createActions([
	'initNavList',

	'zoom',
	'changeLocation',
	'changeContentTitle',

	'initialAirQuilityData',

	'navBarSelectedData',
	'navBarSelectSubtrate',

	'doSearch'
]);

module.exports = actions;
