var Reflux = require('reflux');
var Actions = require('../actions/Actions');

module.exports = Reflux.createStore({

	listenables: Actions,

	init: function() {
		this.county = 0;
		this.metadata = {
			'0': {
				scale: 7000,
				center: [120.0, 23.5]
			},
			'10017': {
				scale: 80000,
				center: [121.7, 25.05]
			},
			'63': {
				scale: 70000,
				center: [121.53, 25.06]
			},
			'65': {
				scale: 30000,
				center: [121.55, 24.9]
			},
			'68': {
				scale: 30000,
				center: [121.2, 24.8]
			},
			'10004': {
				scale: 30000,
				center: [121.1, 24.6]
			},
			'10018': {
				scale: 60000,
				center: [120.9, 24.7]
			},
			'10005': {
				scale: 35000,
				center: [120.9, 24.4]
			},
			'66': {
				scale: 30000,
				center: [120.95, 24.1] 
			},
			'10007': {
				scale: 35000,
				center: [120.4, 23.9] 
			},
			'10009': {
				scale: 35000,
				center: [120.5, 23.7] 
			},
			'10010': {
				scale: 35000,
				center: [120.5, 23.4] 
			},
			'10020': {
				scale: 50000,
				center: [120.42, 23.41] 
			},
			'67': {
				scale: 30000,
				center: [120.3, 23.0] 
			},
			'64': {
				scale: 20000,
				center: [120.5, 22.8] 
			},
			'10013': {
				scale: 20000,
				center: [120.6, 22.26] 
			},
			'10014': {
				scale: 15000,
				center: [121.0, 22.7] 
			},
			'10015': {
				scale: 15000,
				center: [121.25, 23.7] 
			},
			'10002': {
				scale: 30000,
				center: [121.64, 24.60] 
			},
			'10008': {
				scale: 20000,
				center: [120.9, 23.8] 
			},
			'09020': {
				scale: 50000,
				center: [118.37, 24.5] 
			},
			'10016': {
				scale: 50000,
				center: [119.59, 23.48] 
			},
			'09007': {
				scale: 50000,
				center: [119.9, 26.15] 
			}
		};
	},

	getInitialState: function() {
		return {
			geojson: this.county === 0 ? 'assets/geojson/country.json' : 'assets/geojson/twonship.json',
			id: this.county,
			scale: this.metadata[this.county].scale,
			center: this.metadata[this.county].center,
			cName: '',
		};
	},

	onChangeLocation: function(countyId, cName) {
		this.trigger({
			geojson: countyId === 0 ? 'assets/geojson/country.json' : 'assets/geojson/twonship.json',
			id: countyId,
			scale: this.metadata[countyId].scale,
			center: this.metadata[countyId].center,
			cName: cName,
		});
	}

})