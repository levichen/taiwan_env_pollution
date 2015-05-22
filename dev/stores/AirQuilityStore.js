var Reflux = require('reflux');
var $ = require('jquery');
var Actions = require('../actions/Actions');

module.exports = Reflux.createStore({

	listenables: Actions,

	init: function() {},

	getInitialState: function() {
		return {
			now: []
		};
	},

	onInitialAirQuilityData: function() {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/air_quility/now',
			dataType: 'json'
		}).done(function(data) {
			that.trigger({ now: data });
		}).fail(function(err, msg) {
			console.log(msg);
		});
	}

});