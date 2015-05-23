var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var NavBarStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.navList = [];

		this.navList = [
			{
				"type": 1,
				"title": "範圍",
				"sub": [
					{
						"sub_id": "factory",
						"sub_title": "工廠排放",
						"sub_color": "#2B2C88"
					},
					// {
					// 	"sub_id": 1,
					// 	"sub_title": "河川汙染"
					// }
				]
			},
			{
				"type": 2,
				"title": "地點",
				"sub": [
					{
						"sub_id": "incinerators",
						"sub_title": "焚化爐",
						"sub_color": "#88342B"
					},
					{
						"sub_id": "garbage",
						"sub_title": "垃圾場",
						"sub_color": "#5864E7"
					},
					{
						"sub_id": "airstation",
						"sub_title": "空氣污染站",
						"sub_color": "#2D7679"
					},
					{
						"sub_id": "petition",
						"sub_title": "民眾陳情地點",
						"sub_color": "#66304E"
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