var Reflux = require('reflux');
var Actions = require('../actions/Actions');

module.exports = Reflux.createStore({

	listenables: Actions,

	// getInitialState: function() {
	// 	return {
	// 		geojson: this.county === 0 ? 'assets/geojson/country.json' : 'assets/geojson/twonship.json',
	// 		id: this.county,
	// 		scale: this.metadata[this.county].scale,
	// 		center: this.metadata[this.county].center,
	// 		cName: '',
	// 	};
	// },
	onZoom: function(translate, scale) {
		this.trigger(null, null, translate, scale);
	},
	onChangeLocation: function(countyId, cName, translate, scale, center) {
		this.trigger(countyId, cName, translate, scale, center);
	}

})
