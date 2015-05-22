var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var NavBarStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.navList = [];

		this.navList = [
			{
				"type": 1,
				"title": "Range",
				"sub": [
					{
						"sub_id": 0,
						"sub_title": "工廠排放"
					},
					{
						"sub_id": 1,
						"sub_title": "河川汙染"
					}
				]
			},
			{
				"type": 2,
				"title": "Location",
				"sub": [
					{
						"sub_id": 2,
						"sub_title": "民眾陳情"
					},
					{
						"sub_id": 3,
						"sub_title": "有人類"
					}
				]
			}
		];
	},
	getInitialState: function() {
        return {
            navList: this.navList,
            enabled: true
        };
    },
});

module.exports = NavBarStore;