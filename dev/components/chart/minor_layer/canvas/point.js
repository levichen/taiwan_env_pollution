var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');
var Actions = require('../../../../actions/Actions');
var MoinorLayerStore = require('../../../../stores/MinorLayerStore');;

module.exports = React.createClass({

	mixins: [
		// Reflux.connect(MoinorLayerStore)
		Reflux.listenTo(MoinorLayerStore, 'onDraw')
	],

	getInitialState: function() {
		return {};
	},

	render: function() {
		return (
			<canvas ref='moinorCanvas' width={this.props.width} height={this.props.height}></canvas>
		);
	},

	componentDidMount: function() {},

	drawLayer: function() {
		var canvas = this.refs.moinorCanvas.getDOMNode();
		var ctx = canvas.getContext('2d');
		var data = this.state.data;
		var coordinate;
		var projection = d3.geo.mercator()
							.scale(this.props.county.scale)
							.center(this.props.county.center)
							.translate([this.props.width / 2, this.props.height / 2]);
		var drawColor = {
			"garbage": "#5864E7",
			"airstation": "#2D7679",
			"petition": "#66304E"
		};

		canvas.width = this.props.width;
    	canvas.height = this.props.height;

		ctx.clearRect(0, 0, this.props.width, this.props.height);
		
		for (var key in data) {
			ctx.fillStyle = drawColor[key];
			if (data[key] === undefined) {
				continue;
			}

			for (var i = 0; i < data[key].length; i++) {
		        ctx.beginPath();
				coordinate = projection([data[key][i].loc.lng, data[key][i].loc.lat]);
				ctx.arc(coordinate[0], coordinate[1], 5, 0, 2 * Math.PI, true);
				ctx.closePath();
				ctx.fill();
			}
		}
	},

	onDraw: function(type) {
		if (type === MoinorLayerStore.type.CHANGE_SELECT) {
			var data = {};
			for (var i = 0; i < arguments[1].length && this.state.data !== undefined; i++) {
				data[arguments[1][i]] = this.state.data[arguments[1][i]];
			}

			this.setState({
				selectedData: arguments[1],
				data: data
			});
		}
		else if (type === MoinorLayerStore.type.UPDATE_DATA) {
			var data = this.state.data || {};
			data[arguments[1]] = arguments[2];
			this.setState({data: data});
		}
		
		this.drawLayer();
	},

});
