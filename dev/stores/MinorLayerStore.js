var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var $ = require('jquery');

module.exports = Reflux.createStore({

	listenables: Actions,

	type: {
		CHANGE_SELECT: 0,
		UPDATE_DATA: 1
	},

	getData: function(type) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/minordata/' + type,
			dataType: 'json'
		}).done(function(data) {
			that.trigger(this.type.UPDATE_DATA, type, data);
		}).fail(function(err, msg) {
			console.log(msg);
		});
	},

	onNavBarSelectedData: function(selectedData) {
		for (var i = 0; i < selectedData.length; i++) {
			this.getData(selectedData[i]);
		}
		this.trigger(this.type.CHANGE_SELECT, selectedData);
	}

});