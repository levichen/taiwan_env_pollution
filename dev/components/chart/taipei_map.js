var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');

var Actions = require('../../actions/Actions');
var MapStore = require('../../stores/MapStore');
var SubstrateLayer = require('./substrate_layer');
// var FactoryAirPollution = require('./bubble_chart');
// var InfoLayer = require('../canvas/bubble_chart');

module.exports = React.createClass({

	mixins: [
		Reflux.connect(MapStore, 'county')
	],

	getInitialState: function() {
		return {
			width: 0,
			height: 0
		};
	},

	componentWillmount: function() {
		// TODO
	},

	// <FactoryAirPollution projection={this.state.projection}/>
	render: function() {
		this.drawMap();

		return (
			<div id="map" ref="mapContainer" className="taipei-map">
				<div>
					<svg width={this.props.width} height={this.props.height}>
						<g ref="map"></g>
					</svg>
				</div>
				<div>
					<canvas width={this.props.width} height={this.props.height} className="canvas" ref="mapCanvas"></canvas>
				</div>
			</div>
		);
	},

	componentDidMount: function() {
		this.drawMap();

		var dom = this.refs.mapCanvas.getDOMNode();
		var ctx = dom.getContext('2d');
		React.render(
			<SubstrateLayer canvas={dom} ctx={ctx} {...this.state} {...this.props}></SubstrateLayer>,
			dom
		);
	},

	drawMap: function() {
		var projection = d3.geo.mercator()
							.scale(this.state.county.scale)
							.center(this.state.county.center)
							.translate([this.props.width / 2, this.props.height / 2]);
		var path = d3.geo.path().projection(projection);
		var taipeiMap = d3.select(React.findDOMNode(this.refs.map));
		var that = this;

		taipeiMap.selectAll('path').remove();
		d3.json(this.state.county.geojson, function(err, taiwan) {
			if (err) {
				return 'error';
			}

			if (that.state.county.id !== 0) {
				for (var i = 0; i < taiwan.features.length; i++) {
					if (taiwan.features[i].properties.County_ID != that.state.county.id) {
						delete taiwan.features[i];
					}
				}
			}

			taipeiMap.selectAll('path')
				.data(taiwan.features)
				.enter()
				.append('path')
				.attr('fill', '#FFF')
				.attr('stroke', '#000')
				.attr('storke-width', 1)
				.attr('d', path)
				.on('mouseover', function(data, i) {
					// console.log('mouseover');
				})
				.on('mouseout', function(data, i) {
					// console.log('mouseout');
				})
				.on('mousedown', function(data, i) {
					Actions.changeLocation(data.properties.County_ID, data.properties.C_Name);
				});
		});
	}

});