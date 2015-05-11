var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
	getInitialState: function() {
		// TODO
		return {};
	},

	componentDidMount: function() {
		var svg = d3.select(React.findDOMNode(this.refs.maplegend));
		var color = d3.scale.ordinal().domain(this.props.domain).range(this.props.range);

		for (var i = 0; i < this.props.domain.length; i++) {
			var g = svg.append('g');

			g.append('rect')
				.attr('y', i * 40)
				.attr('width', '40px')
				.attr('height', '40px')
				.attr('fill', color(this.props.range[i]))
				.attr('storke', '#FFFFFF')
				.attr('storke-width', '0.5');

			g.append('text')
				.attr('x', '45px')
				.attr('y', (i * 40 + 25))
				.attr('fill', '#000')
				.attr('font-weight', 300)
				.attr('font-size', '9pt')
				.text('≦' + this.props.domain[i]);
		}
	},

	componentWillUnMount: function() {
		// TODO
	},

	render: function() {
		var height = 40 * this.props.domain.length;
		var width = 100;

		return (
			<div style={this.props.style}>
				<svg ref="maplegend" height={height} width={width}></svg>
			</div>
		);
	}
});