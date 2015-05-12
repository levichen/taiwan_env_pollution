var React = require('react');
var d3 = require('d3');
var FactoryAirPollution = require('./bubble_chart');

module.exports = React.createClass({
	getInitialState: function() {
		var projection = d3.geo.mercator()
							.scale(100000)
							.center([121.55, 25.06])
							.translate([this.props.width / 2, this.props.height / 2]);
		var path = d3.geo.path().projection(projection);	

		return {
			'projection': projection,
			'path': path
		};
	},

	componentDidMount: function() {
		var taipeiMap = d3.select(React.findDOMNode(this.refs.map));
		var that = this;
				
		d3.json('geojson/twonship.json', function(err, taiwan) {
			if (err) {
				return 'error';
			}

			for (var i = 0; i < taiwan.features.length; i++) {
				if (taiwan.features[i].properties.County_ID != 63) {
					delete taiwan.features[i];
				}
			}

			taipeiMap.selectAll('path')
				.data(taiwan.features)
				.enter()
				.append('path')
				.attr('fill', '#FFFFFF')
				.attr('stroke', '#C5C5C5')
				.attr('storke-width', 1)
				.attr('d', that.state.path)
				.on('mouseover', function(data, i) {
					console.log('mouseover');
				})
				.on('mouseout', function(data, i) {
					console.log('mouseout');
				})
				.on('mousedown', function(data, i) {
					console.log('mousedown');
				});
		});
	},

	componentWillUnmount: function() {
		// TODO
	},

	render: function() {
		return (
			<div id="map" style={this.props.style}>
				<svg width={this.props.width} height={this.props.height}>
					<g ref="map"></g>
					<FactoryAirPollution projection={this.state.projection}/>
				</svg>
			</div>
		);
	}
});