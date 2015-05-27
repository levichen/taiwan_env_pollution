var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var MainContentStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.contentTitle = "台灣環境汙染圖";

	},
	getInitialState: function() {
        return {
            contentTitle: this.contentTitle
        };
    },
    onChangeContentTitle: function(title) {
    	this.contentTitle = title;
    	this.trigger({contentTitle: title});
    },
});

module.exports = MainContentStore;