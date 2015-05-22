var React = require('react');
var Reflux = require('reflux');
var AirQuilityStore = require('../../../stores/AirQuilityStore');

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


		var gradient = ctx.createLinearGradient(0, 0, 0, 256);
		this.props.canvas.width = 1;
    	this.props.canvas.height = 256;
		gradient.addColorStop(0.4, 'blue');
		gradient.addColorStop(0.6,  'cyan');
		gradient.addColorStop(0.7, 'lime');
		gradient.addColorStop(0.8, 'yellow');
		gradient.addColorStop(1, 'red');
		ctx.fillStyle = gradient;
    	ctx.fillRect(0, 0, 1, 256);
    	var grad = ctx.getImageData(0, 0, 1, 256).data;


		ctx.clearRect(0, 0, this.props.width, this.props.height);
		for (var i = 0; i < data.length; i++) {
			coordinate = projection([data[i].loc.lng, data[i].loc.lat]);

			var blur = 15;
			var r = 30;
			var r2 = 4 + blur;
			ctx.shadowOffsetX = ctx.shadowOffsetY = 200;
	        ctx.shadowBlur = blur;
	        ctx.shadowColor = 'black';

	        ctx.beginPath();
	        ctx.arc(coordinate[0] + blur - 200, coordinate[1] + blur - 200, r, 0, 2 * Math.PI, true);
	        ctx.closePath();
	        ctx.fill();


			// var gradient = ctx.createRadialGradient(coordinate[0], coordinate[1], 
			// 	0, coordinate[0], coordinate[1], 20);
			// gradient.addColorStop(0.4, 'blue');
			// gradient.addColorStop(0.6,  'cyan');
			// gradient.addColorStop(0.7, 'lime');
			// // gradient.addColorStop(0.8, 'yellow');
			// gradient.addColorStop(1, 'red');
			// ctx.fillStyle = gradient;

			// ctx.beginPath();
			// ctx.globalAlpha = 0.5 / 1;
			// ctx.shadowBlur = 0.3;
	  //       ctx.shadowColor = 'black';
			// // ctx.globalCompositeOperation = 'darker';
	  //     	ctx.arc(coordinate[0], coordinate[1], 20, 0, 2 * Math.PI, true);
	  //     	ctx.fill();
		}

		return null;
	},

	componentDidMount: function() {
	}

});