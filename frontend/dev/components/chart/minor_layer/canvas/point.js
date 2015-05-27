var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');
var Actions = require('../../../../actions/Actions');
var MoinorLayerStore = require('../../../../stores/MinorLayerStore');;
var MapStore = require('../../../../stores/MapStore');;

module.exports = React.createClass({

	mixins: [
		// Reflux.connect(MoinorLayerStore)
		Reflux.listenTo(MoinorLayerStore, 'onDraw'),
		Reflux.listenTo(MapStore, 'onMapChange')
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

	drawPoint: function() {
		var canvas = this.refs.moinorCanvas.getDOMNode();
		var ctx = canvas.getContext('2d');
		var data = this.state.data;
		var coordinate;
		var x = this.props.width / 2;
		var y = this.props.height / 2;
		if(this.state.translate) {
			x = this.state.translate[0];
			y = this.state.translate[1];
		}
		var projection = d3.geo.mercator()
							.scale(this.state.scale || this.props.county.scale)
							.center(this.props.county.center)
							.translate([x, y]);
	
		var drawColor = {
			"incinerators": "#88342B",
			"garbage": "#5864E7",
			"airstation": "#2D7679",
			"petition": "#66304E"
		};

		ctx.globalCompositeOperation = 'darken';

		if (data !== undefined && data['petition'] !== undefined) {
			ctx.fillStyle = "#66304E";
			for (var i = 0; i < data['petition'].length; i++) {
		        ctx.beginPath();
				coordinate = projection([data['petition'][i].loc.lng, data['petition'][i].loc.lat]);
				ctx.arc(coordinate[0], coordinate[1], 1, 0, 2 * Math.PI, true);
				ctx.closePath();
				ctx.fill();
			}
		}

		for (var key in data) {
			ctx.fillStyle = drawColor[key];
			if (key === 'petition' || data[key] === undefined) {
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

	onMapChange: function(id, name, translate, scale) {
		this.setState({translate: translate, scale: scale})
		this.drawLayer();
	},

	drawCircle: function() {
		var canvas = this.refs.moinorCanvas.getDOMNode();
		var ctx = canvas.getContext('2d');
		var data = this.state.substrateData;
		var coordinate;
		var x = this.props.width / 2;
		var y = this.props.height / 2;
		if(this.state.translate) {
			x = this.state.translate[0];
			y = this.state.translate[1];
		}
		var projection = d3.geo.mercator()
							.scale(this.state.scale || this.props.county.scale)
							.center(this.props.county.center)
							.translate([x, y]);

		var airPollutionType = 'VOCs';
		ctx.globalCompositeOperation = 'darken';
		for (var key in data) {
			if (data[key] === undefined) {
				continue;
			}

			var max = 0, min = 100000;
			for (var i = 0; i < data[key].length; i++) {
				var val = +data[key][i][airPollutionType];
				if (val == 0) {
					continue;
				}
				max = Math.max(max, val);
			}

			ctx.fillStyle = 'rgba(64, 192, 160, 1)';
			for (var i = 0; i < data[key].length; i++) {
				var val = +data[key][i][airPollutionType];
				if (val === 0 || data[key][i].loc === undefined) {
					continue;
				}
				var rate = Math.max(val / max, 0.1);
				ctx.beginPath();
				coordinate = projection([data[key][i].loc.lng, data[key][i].loc.lat]);
				ctx.arc(coordinate[0], coordinate[1], 50 * rate, 0, 2 * Math.PI, true);
				ctx.closePath();
				ctx.fill();
			}
		}
	},

	drawLayer: function() {
		var canvas = this.refs.moinorCanvas.getDOMNode();
		ctx = canvas.getContext('2d');
		canvas.width = this.props.width;
    	canvas.height = this.props.height;
		ctx.clearRect(0, 0, this.props.width, this.props.height);

		this.drawCircle();
		this.drawPoint();
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
		else if (type === MoinorLayerStore.type.CHANGE_SELECT_SUBSTRATEDATA) {			
			var data = {};
			for (var i = 0; i < arguments[1].length  && this.state.selectedSubstrateData !== undefined; i++) {
				data[arguments[1][i]] = this.state.substrateData[arguments[1][i]];
			}

			this.setState({
				selectedSubstrateData: arguments[1],
				substrateData: data
			});
		}
		else if (type === MoinorLayerStore.type.UPDATE_SUBSTRATE_DATA) {
			var data = this.state.substrateData || {};
			data[arguments[1]] = arguments[2];
			this.setState({ substrateData: data });
		}
		
		this.drawLayer();
	}
});
