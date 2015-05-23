var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');

var Actions = require('../../actions/Actions');
var MapStore = require('../../stores/MapStore');
var SubstrateLayer = require('./substrate_layer');
var MinorLayer = require('./minor_layer/canvas/point');
// var FactoryAirPollution = require('./bubble_chart');
// var InfoLayer = require('../canvas/bubble_chart');

module.exports = React.createClass({

	mixins: [
		// Reflux.connect(MapStore, 'county')
		Reflux.listenTo(MapStore, 'onChangeCounty')
	],

	metadata: {
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
	},

	init: function() {
	},

	getInitialState: function() {
		var initCounty = 0;
		return {
			width: 0,
			height: 0,
			county: {
				geojson: initCounty === 0 ? 'assets/geojson/country.json' : 'assets/geojson/twonship.json',
				id: initCounty,
				scale: this.metadata[initCounty].scale,
				center: this.metadata[initCounty].center,
				cName: '',
			}
		};
	},

	componentWillmount: function() {
		// TODO
	},

	render: function() {
		return (
			<div id="map" ref="mapContainer" className="taipei-map">
				<div id="div-svg">
					<svg width={this.props.width} height={this.props.height}>
						<g ref="map"></g>
					</svg>
				</div>
				<div>
					<SubstrateLayer {...this.state} {...this.props}></SubstrateLayer>
				</div>
				<div>
					<SubstrateLayer {...this.state} {...this.props}></SubstrateLayer>
				</div>
				<div>
					<MinorLayer {...this.state} {...this.props}></MinorLayer>
				</div>
			</div>
		);
	},

	componentDidMount: function() {
		this.drawMap();
	},

	drawMap: function() {
		var projection = d3.geo.mercator()
							.scale(this.state.county.scale)
							.center(this.state.county.center)
							.translate([this.props.width / 2, this.props.height / 2]);
		var path = d3.geo.path().projection(projection);
		var map = d3.select(React.findDOMNode(this.refs.map).parentNode);
		var taipeiMap = d3.select(React.findDOMNode(this.refs.map));
		var that = this;
		taipeiMap.selectAll('path').remove();
		d3.json(this.state.county.geojson, function(err, taiwan) {
			if (err) {
				return 'error';
			}
			map.call(d3.behavior.zoom().scaleExtent([0.3, 8]).on("zoom", function() {
				var scale = d3.event.scale;
				console.log(scale);
				taipeiMap.attr("transform", "translate(" + d3.event.translate + ")scale(" + scale + ")");
			}));

			taipeiMap.selectAll('path')
				.data(taiwan.features)
				.enter()
				.append('path')
				.attr('fill', function(data, i) {
					if (that.state.county.id === 0 || data.properties.County_ID !== that.state.county.id) {
						return 'transparent';
					}
					else {
						return 'RGBA(255,0, 0, 0.5)';
					}
				})
				.attr('stroke', '#000')
				.attr('storke-width', 1)
				.attr('d', path)
				.on('mouseover', function(data, i) {
					// console.log('mouseover');
				})
				
				.on('mouseout', function(data, i) {
					// console.log('mouseout');
				})
				.on('contextmenu', function() {
					d3.event.preventDefault();
				})
				.on('mousedown', function(data, i) {
					if(d3.event.button == 0)
						Actions.changeLocation(data.properties.County_ID, data.properties.C_Name);
					else if(d3.event.button == 2)
						Actions.changeLocation(0, '');
				});
		});
	},

	onChangeCounty: function(countyId, cName, scale) {
		var map = d3.select(React.findDOMNode(this.refs.map).parentNode);
		var taipeiMap = map.select('g');
		if(countyId == this.state.county.id)
			return;
		this.setState({
			county: {
				geojson: countyId === 0 ? 'assets/geojson/country.json' : 'assets/geojson/twonship.json',
				id: countyId,
				scale: scale || this.metadata[countyId].scale,
				center: this.metadata[countyId].center,
				cName: cName,
			}
		});
		taipeiMap.attr("transform", "");
		this.drawMap();
	}

});
