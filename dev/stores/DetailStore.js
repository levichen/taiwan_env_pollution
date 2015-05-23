var Reflux = require('reflux');
var Actions = require('../actions/Actions');

var DetailStore = Reflux.createStore({
	listenables: Actions,
	init: function() {
		this.dummyData = [
            {name: '松山區', data: []},
            {name: '信義區', data: []},
            {name: '大安區', data: []},
            {name: '中山區', data: []},
            {name: '中正區', data: []},
            {name: '大同區', data: []},
            {name: '萬華區', data: []},
            {name: '文山區', data: []},
            {name: '南港區', data: []},
            {name: '內湖區', data: []},
            {name: '士林區', data: []},
            {name: '北投區', data: []}
        ];

	},
	getInitialState: function() {
        return {
            dummyData: this.dummyData
        };
    }
});

module.exports = DetailStore;