var React = require('react');
var d3 = require('d3');

module.exports = React.createClass({
	drawBorder: function(digram, margin) {
		digram.append('line')
			.attr('x1', 0)
			.attr('x2', this.props.digramWidth)
			.attr('transform', 'translate('+(this.props.titleWidth+margin)+', '+this.props.height+')')
			.attr('stroke', '#E0E0E0')
			.attr('storke-width', '0.5');

		digram.append('line')
			.attr('y1', 0)
			.attr('y2', this.props.height)
			.attr('stroke', '#E0E0E0')
			.attr('transform', 'translate('+(this.props.titleWidth+margin)+', 0)')
			.attr('storke-width', '0.5');

	},

	drawPath: function(digram, data, margin) {
		var x = d3.scale.linear()
						.domain([0, data.length])
						.range([0, this.props.digramWidth]);
		var y = d3.scale.linear()
						.domain([0, 100])
						.range([0, this.props.height]);

		var line = d3.svg.line()
						.x(function(d, i) {
							return x(i);
						})
						.y(function(d, i) {
							return y(d);
						});
		digram.append('path')
			.attr('fill', '#FFFFFF')
			.attr('stroke', '#D2B48C')
			.attr('stroke-width', '0.5')
			.attr('transform', 'translate('+(this.props.titleWidth+margin)+', 0)')
			.attr('d', line(data));
	},

	drawTitle: function(text) {
		text.append('text')
			.attr('x', this.props.titleWidth)
			.attr('y', this.props.height / 2 + 5)
			.attr('fill', '#000')
			.attr('font-weight', 300)
			.attr('font-size', '9pt')
			.attr('text-anchor', 'end')
			.text(this.props.title);
	},

	getInitialState: function() {
		return {};
	},

	componentDidMount: function() {
		var margin = 10;
	
		var text = d3.select(React.findDOMNode(this.refs.factory_air_pollution)).append('g');
		this.drawTitle(text);

		var digram = d3.select(React.findDOMNode(this.refs.factory_air_pollution)).append('g');
		this.drawBorder(digram, margin);
		this.drawPath(digram, this.props.data, margin);	
	},

	componentWillUnmount: function() {

	},

	render: function() {
		return (
			<div style={{margin: '10px 0 10px 0'}}>
				<svg ref="factory_air_pollution" width={this.props.titleWidth + this.props.digramWidth} height={this.props.height}></svg>
			</div>
		);
	}
});