var React = require('react');
var TaipeiMap = require('./chart/taipei_map');
var MapLegend = require('./chart/map_legend');
var Details = require('./chart/details');
var mapWidth, mapHeight;
var mapLegendWidth, mapLegendHeight, mapLegendDomain, mapLegendRange;

var MainContent = React.createClass({

	initMapArgs: function() {
		mapWidth = 540;
		mapHeight = 600;
		console.log(mapWidth);
	},
	
	initMapLegendArgs: function() {
		mapLegendDomain = [50, 100, 150, 200, 300, 500];
		mapLegendRange = ['#3CB371', '#FFCC22', '#FF8800', '#E63F00', '#CC0000', '#8C0044'];
		mapLegendWidth = 100;
	},

	componentWillMount: function() {
		this.initMapArgs();
		this.initMapLegendArgs();
	},

	render: function() {		
		var title = "台北市空氣汙染圖";
		return (
			<div>
				<div className="content-title">
					<span>{title}</span>
				</div>
				<div id="container-content" className="center">
					<MapLegend width={mapLegendWidth} domain={mapLegendDomain} range={mapLegendRange}/>
					<TaipeiMap width={mapWidth} height={mapHeight} />
					<Details></Details>
				</div>
			</div>
		);
	}

});

module.exports = MainContent;