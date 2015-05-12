var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		var bubbleChart = d3.select(React.findDOMNode(this.refs.layer));
		var that = this;

		var data = [
			{
				location: [121.55, 25.06],
				rate: 0.191
			},
			{
				location: [121.6250345, 25.0587357],
				rate: 0.01
			},
			{
				location: [121.6101429, 25.0628176],
				rate: 0.09
			},
			{
				location: [121.5853807, 25.0551591],
				rate: 0.11
			},
			{
				location: [121.5718624, 25.0439231],
				rate: 0.2
			},
			{
				location: [121.5504476, 25.0362245],
				rate: 0.15
			},
			{
				location: [121.5428087, 25.0225369],
				rate: 0.05
			},
			{
				location: [121.542122, 25.0581914],
				rate: 0.19
			},
			{
				location: [121.5534088, 25.1092251],
				rate: 0.009
			}
		];

		bubbleChart.selectAll('circle')
					.data(data)
					.enter()
					.append('circle')
					.attr('cx', function(d) {
						return that.props.projection(d.location)[0];
					})
					.attr('cy', function(d) {
						return that.props.projection(d.location)[1];
					})
					.attr('r', function(d) {
						return d.rate * 300;
					})
					.attr('fill', 'red')
					.attr('fill-opacity', 0.2);
	},

	componentWillUnMount: function() {

	},

	render: function() {
		return (
			<g ref="layer"></g>
		);
	}

});