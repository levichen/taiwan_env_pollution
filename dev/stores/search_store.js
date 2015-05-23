var Reflux = require('reflux');
var Actions = require('../actions/Actions');
var $ = require('jQuery');
var SearchStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.enabled = false;
	},
	getInitialState: function() {
			return {
					enabled: this.enabled
			};
	},
	onDoSearch: function(keyword) {
		var that = this;
		$.ajax({
			method: 'GET',
			url: 'http://ltzuhsiu.org:3333/searchAddr/?addr=' + keyword,
			dataType: 'json'
		}).done(function(data) {
			if(data.length == 0) {
				return alert('查無資料');
			}
			var data = {
				enabled: true,
				result: data
			};
			that.trigger(data);
		}).fail(function(err, msg) {
			console.log(msg);
		});
	}
});

module.exports = SearchStore;