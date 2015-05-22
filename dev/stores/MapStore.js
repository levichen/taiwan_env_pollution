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

	onChangeLocation: function(countyId, cName) {
		this.trigger(countyId, cName);
	}

})