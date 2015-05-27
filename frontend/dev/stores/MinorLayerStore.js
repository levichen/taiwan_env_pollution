var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var $ = require('jquery');

module.exports = Reflux.createStore({

	listenables: Actions,

	type: {
		CHANGE_SELECT: 0,
		UPDATE_DATA: 1,
		REDRAW: 2,
		CHANGE_SELECT_SUBSTRATEDATA: 3,
		UPDATE_SUBSTRATE_DATA: 4
	},

	getMinorData: function(type) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/minordata/' + type,
			dataType: 'json'
		}).done(function(data) {
			that.trigger(that.type.UPDATE_DATA, type, data);
		}).fail(function(err, msg) {
			console.log(msg);
		});
	},

	getSubstrateData: function(type) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/air_quility/factory_pollution_report',
			dataType: 'json'
		}).done(function(data) {
			that.trigger(that.type.UPDATE_SUBSTRATE_DATA, type, data);
		}).fail(function(err, msg) {
			console.log(msg);
		});
	},

	onNavBarSelectedData: function(selectedData, beforeData) {
		var isFound;

		for (var i = 0; i < selectedData.length; i++) {
			isFound = false;
			for (var j = 0; j < beforeData.length; j++) {
				if (selectedData[i] === beforeData[j]) {
					isFound = true;
					break;
				}
			}
			if (!isFound) {
				this.getMinorData(selectedData[i]);
			}
		}
		this.trigger(this.type.CHANGE_SELECT, selectedData);
	},

	onNavBarSelectSubtrate: function(selectedData, beforeData) {
		var isFound;
		for (var i = 0; i < selectedData.length; i++) {
			isFound = false;
			for (var j = 0; j < beforeData.length; j++) {
				if (selectedData[i] === beforeData[j]) {
					isFound = true;
					break;
				}
			}
			if (!isFound) {
				this.getSubstrateData(selectedData[i]);
			}
		}
		this.trigger(this.type.CHANGE_SELECT_SUBSTRATEDATA, selectedData);
	},

	onChangeLocation: function() {
		this.trigger(this.type.REDRAW);
	}

});