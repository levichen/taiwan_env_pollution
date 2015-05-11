var React = require('react');
var d3 = require('d3');
var FactoryAirPollution = require('./factory_air_pollution');

var digramWidth = 210, digramHeight = 30;
var nameStyle = {
	'float': 'left', 
	'fontWeight': '700', 
	'textAlign': 'right',
	'fontSize': '10px',
	'width': '90px'
};
var digramStyle = {
	'float': 'left', 
	'fontWeight': '700', 
	'textAlign': 'center',
	'fontSize': '10px',
	'width': '120px'
};

module.exports = React.createClass({
	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
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
			items.push(<FactoryAirPollution titleWidth={90} digramWidth={120} height={digramHeight} 
				title={this.state.data[i].name} data={this.state.data[i].data} />);
		}

		return (
			<div style={this.props.style} ref="details">
				<div id="detail-head">
					<div id="detail-name" style={nameStyle}>Name</div>
					<div id="detail-digram" style={digramStyle}>Digram</div>
				</div>
				<div style={{marginTop: '20px'}}>{items}</div>
			</div>
		);
	}
});