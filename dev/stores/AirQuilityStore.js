var Reflux = require('reflux');
var $ = require('jquery');
var Actions = require('../actions/Actions');

module.exports = Reflux.createStore({

	listenable: Actions,

	init: function() {
		var that = this;
		this.airQuilityData = [];
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/air_quility/now',
			dataType: 'json'
		}).done(function(data) {
			that.trigger({ now: data });
		}).fail(function(err, msg) {
			console.log(msg);
			// console.log(err);
		});
	},

	getInitialState: function() {

		return {
			now: this.airQuilityData
		};
	},

});