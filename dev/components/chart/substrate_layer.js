var React = require('react');
var d3 = require('d3');
var Reflux = require('reflux');
var AirQuilityStore = require('../../stores/AirQuilityStore');
var MapStore = require('../../stores/MapStore');
var Actions = require('../../actions/Actions');

module.exports = React.createClass({

	mixins: [
		// Reflux.connect(AirQuilityStore, 'airQuility')
		Reflux.listenTo(AirQuilityStore, 'onDrawLayer'),
		Reflux.listenTo(MapStore, 'onMapChange')
	],

	getInitialState: function() {
		return {
			radius: 40,
			blur: 30
		}
	},

	componentWillMount: function() {
	},

	render: function() {	
		return (
			<canvas className="canvas" ref="mapCanvas" width={this.props.width} height={this.props.height}></canvas>
		);
	},

	componentDidMount: function() {
		Actions.initialAirQuilityData();
	},

	getGradient: function(canvas, ctx) {
		// grad
		var gradient = ctx.createLinearGradient(0, 0, 0, 256);
		canvas.width = 1;
    	canvas.height = 256;
		gradient.addColorStop(0.1, 'blue');
		gradient.addColorStop(0.2,  'cyan');
		gradient.addColorStop(0.5, 'lime');
		gradient.addColorStop(0.98, 'yellow');
		gradient.addColorStop(1, 'red');
		ctx.fillStyle = gradient;
    	ctx.fillRect(0, 0, 1, 256);
    	return ctx.getImageData(0, 0, 1, 256).data;

	},

	getMaxValue: function(data) {
		var max = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].AirQuility === undefined || data[i].AirQuility['PM2.5'] === undefined)  {
				continue;
			}
			max = Math.max(max, +data[i].AirQuility['PM2.5']);
		}
		return max;
	},

	grayToRGB: function(ctx, grad) {
		var colored = ctx.getImageData(0, 0, this.props.width, this.props.height);
		for (var i = 3, len = colored.data.length, j; i < len; i+=4){
			j = colored.data[i] * 4;

			if (j) {
				colored.data[i - 3] = grad[j];
				colored.data[i - 2] = grad[j + 1];
				colored.data[i - 1] = grad[j + 2];
			}
		}
		ctx.putImageData(colored, 0, 0);
	},

	drawLayer: function() {
		var canvas = this.refs.mapCanvas.getDOMNode();
		//console.log(d3.select(this.refs.svg.getDomNode()));
		var ctx = canvas.getContext('2d');
		var data = this.state.airQuility.now;
		var coordinate;
		var x = this.props.width / 2;
		var y = this.props.height / 2;
		if(this.state.translate) {
			console.log(this.state.translate);
			x = this.state.translate[0];
			y = this.state.translate[1];
		}
		var projection = d3.geo.mercator()
							.scale(this.state.scale || this.props.county.scale)
							.center(this.props.county.center)
							.translate([x, y]);
			

		var grad = this.getGradient(canvas, ctx);
		var max = this.getMaxValue(data);

		canvas.width = this.props.width;
		canvas.height = this.props.height;

		ctx.clearRect(0, 0, this.props.width, this.props.height);
		for (var i = 0; i < data.length; i++) {
			if (data[i].AirQuility === undefined || data[i].AirQuility['PM2.5'] === undefined)  {
				continue;
			}
			
			var rate = data[i].AirQuility['PM2.5'] / max;
			coordinate = projection([data[i].loc.lng, data[i].loc.lat]);

			ctx.shadowOffsetX = this.props.width;
			ctx.shadowOffsetY = this.props.height;
	        ctx.shadowBlur = this.state.blur;
	        ctx.shadowColor = 'black';
	        // var val = Math.round(255 * rate / 3);
	        // ctx.fillStyle = 'rgba(' + val + ',' + val + ',' + val + ',' + Math.round(rate) + ')';
	        // ctx.shadowColor = 'rgba(' + val + ',' + val + ',' + val + ',' + Math.round(rate) + ')';
	        // ctx.globalCompositeOperation = "darker";
			ctx.globalAlpha = Math.max(rate, 0.1);
	        ctx.beginPath();
			ctx.arc(coordinate[0] - this.props.width, coordinate[1] - this.props.height, 
				this.state.radius * rate, 0, Math.PI * 2, true);
			// ctx.arc(coordinate[0], coordinate[1], this.state.radius * rate, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}

		this.grayToRGB(ctx, grad);
	},
	onMapChange: function(id, name, translate, scale) {
		var that = this;
		this.setState({translate: translate, scale: scale})
		clearTimeout(this.timer);
		this.timer = setTimeout(function() {
			that.drawLayer();
		}, 100);
	},
	onDrawLayer: function(type) {
		if (type === AirQuilityStore.type.INIT) {
			this.setState({airQuility: arguments[1]});
			this.drawLayer();
		}
		else {
			console.log('drawlayer');
			this.drawLayer();
		}
	}

});
