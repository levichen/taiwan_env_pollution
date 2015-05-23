var React = require('react');
var Reflux = require('reflux');
var d3 = require('d3');
var DetailStore = require('../../stores/DetailStore');
var BrokenLineChart = require('./broken_line_chart');

module.exports = React.createClass({
	mixins: [Reflux.connect(DetailStore)],
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

		var dummyData = this.state.dummyData;

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
