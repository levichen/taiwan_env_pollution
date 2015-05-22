var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var $ = require('jquery');

module.exports = Reflux.createStore({

	listenables: Actions,

	onInitialMoinorData: function(type) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/minordata/' + type,
			dataType: 'json'
		}).done(function(data) {
			console.log(data);
			that.trigger(data);
		}).fail(function(err, msg) {
			console.log(msg);
		});
	},

	onNavBarSelectedData: function(selectedData) {
		this.trigger({selectedData: selectedData});
		// console.log(selectedData)
	}

});