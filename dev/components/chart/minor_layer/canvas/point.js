var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');
var Actions = require('../../../../actions/Actions');
var MoinorLayerStore = require('../../../../stores/MinorLayerStore');

module.exports = React.createClass({

	mixins: [
		Reflux.connect(MoinorLayerStore, 'data')
	],

	getInitialState: function() {
		return {
			data: []
		};
	},

	render: function() {
		if (this.state.data.length > 0) {
			this.drawLayer();
		}

		return (
			<canvas ref='moinorCanvas' width={this.props.width} height={this.props.height}></canvas>
		);
	},

	componentDidMount: function() {
		Actions.initialMoinorData('incinerators');
	},

	drawLayer: function() {
		var canvas = this.refs.moinorCanvas.getDOMNode();
		var ctx = canvas.getContext('2d');
		var data = this.state.data;
		var coordinate;
		var projection = d3.geo.mercator()
							.scale(this.props.county.scale)
							.center(this.props.county.center)
							.translate([this.props.width / 2, this.props.height / 2]);

		canvas.width = this.props.width;
    	canvas.height = this.props.height;

		ctx.clearRect(0, 0, this.props.width, this.props.height);
		ctx.fillStyle = '#000';
		for (var i = 0; i < data.length; i++) {
	        ctx.beginPath();
			coordinate = projection([data[i].loc.lng, data[i].loc.lat]);
			ctx.arc(coordinate[0], coordinate[1], 5, 0, 2 * Math.PI, true);
			ctx.closePath();
			ctx.fill();
		}
	},

});
