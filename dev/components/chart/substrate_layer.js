var React = require('react');
var Reflux = require('reflux');
var AirQuilityStore = require('../../stores/AirQuilityStore');

module.exports = React.createClass({

	mixins: [
		Reflux.connect(AirQuilityStore, 'airQuility')
	],

	render: function() {
		var projection = d3.geo.mercator()
							.scale(this.props.county.scale)
							.center(this.props.county.center)
							.translate([this.props.width / 2, this.props.height / 2]);
		var coordinate;
		var data = this.state.airQuility.now;
		var ctx = this.props.ctx;

		// radius
		var r = 40;
		var blur = 30;
		var r2 = r + blur;

		// grad
		var gradient = ctx.createLinearGradient(0, 0, 0, 256);
		this.props.canvas.width = 1;
    	this.props.canvas.height = 256;
		gradient.addColorStop(0.1, 'blue');
		gradient.addColorStop(0.2,  'cyan');
		gradient.addColorStop(0.5, 'lime');
		gradient.addColorStop(0.98, 'yellow');
		gradient.addColorStop(1, 'red');
		ctx.fillStyle = gradient;
    	ctx.fillRect(0, 0, 1, 256);
    	var grad = ctx.getImageData(0, 0, 1, 256).data;

		var max = 0;
		for (var i = 0; i < data.length; i++) {
			if (data[i].AirQuility === undefined || data[i].AirQuility['PM2.5'] === undefined)  {
				continue;
			}
			max = Math.max(max, +data[i].AirQuility['PM2.5']);
		}

		this.props.canvas.width = this.props.width;
    	this.props.canvas.height = this.props.height;

		ctx.clearRect(0, 0, this.props.width, this.props.height);
		for (var i = 0; i < data.length; i++) {
			coordinate = projection([data[i].loc.lng, data[i].loc.lat]);

			if (data[i].AirQuility === undefined || data[i].AirQuility['PM2.5'] === undefined)  {
				continue;
			}

			var rate = data[i].AirQuility['PM2.5'] / max;

			ctx.shadowOffsetX = this.props.width;
			ctx.shadowOffsetY = this.props.height;
	        ctx.shadowBlur = blur;
	        ctx.shadowColor = 'black';
	        // var val = Math.round(255 * rate / 3);
	        // ctx.fillStyle = 'rgba(' + val + ',' + val + ',' + val + ',' + Math.round(rate) + ')';
	        // ctx.shadowColor = 'rgba(' + val + ',' + val + ',' + val + ',' + Math.round(rate) + ')';
	        // ctx.globalCompositeOperation = "darker";
			ctx.globalAlpha = Math.max(rate, 0.1);
	        ctx.beginPath();
			ctx.arc(coordinate[0] - this.props.width, coordinate[1] - this.props.height, 
				r * rate, 0, Math.PI * 2, true);
			// ctx.arc(coordinate[0], coordinate[1], r * rate, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
		}

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

		return null;
	},

	componentDidMount: function() {
	}

});