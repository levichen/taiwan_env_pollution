var React = require('react');
var d3 = require('d3');
var BrokenLineChart = require('./broken_line_chart');

module.exports = React.createClass({

	getInitialState: function() {
		return {
			data: []
		};
	},

	componentDidMount: function() {
		// $.get('test', function(result) {
		// 	if (result) {
		// 		this.setState({
		// 			data: result
		// 		});
		// 	}
		// }.bind(this));

		var dummyData = [
			{name: '松山區', data: []},
			{name: '信義區', data: []},
			{name: '大安區', data: []},
			{name: '中山區', data: []},
			{name: '中正區', data: []},
			{name: '大同區', data: []},
			{name: '萬華區', data: []},
			{name: '文山區', data: []},
			{name: '南港區', data: []},
			{name: '內湖區', data: []},
			{name: '士林區', data: []},
			{name: '北投區', data: []}
		];

		for (var i = 0; i < dummyData.length; i++) {
			for (var j = 0; j < 100; j++) {
				dummyData[i].data.push(Math.floor(Math.random() * 100));
			}
		}

		this.setState({
			data: dummyData
		});
	},

	componentWillUnmount: function() {

	},

	render: function() {
		var items = [];
		for (var i = 0; i < this.state.data.length; i++) {
			items.push(<BrokenLineChart class="digram" titleWidth={60} digramWidth={120} height={30} 
				title={this.state.data[i].name} data={this.state.data[i].data} key={i} />);
		}

		return (
			<div ref="details" className="details">
				<div id="head">
					<div id="name">Name</div>
					<div id="digram">Diagram</div>
				</div>
				<div id="content">{items}</div>
			</div>
		);
	}
});
