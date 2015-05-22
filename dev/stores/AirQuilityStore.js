var Reflux = require('reflux');
var $ = require('jquery');
var Actions = require('../actions/Actions');

module.exports = Reflux.createStore({

	type: {
		INIT: 0,
		CHANGE_COUNTY: 1
	},

	listenables: Actions,

	init: function() {
		Reflux.listenTo(Actions.initialAirQuilityData, this.onInitialAirQuilityData);
	},

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
			that.trigger(that.type.INIT, { now: data });
		}).fail(function(err, msg) {
			console.log(msg);
		});
	},

	changeLocation: function() {
		this.trigger(this.type.CHANGE_COUNTY);
	}

});