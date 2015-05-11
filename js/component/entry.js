var React = require('react');
var TaipeiMap = require('./taipei_map');
var MapLegend = require('./map_legend');
var Details = require('./details');
var container;
var mapWidth, mapHeight;
var mapLegendWidth, mapLegendHeight, mapLegendDomain, mapLegendRange;
var style = {
	mapLengend: {
		'float': 'left',
		'paddingTop': '20px'
	},
	map: {
		'float': 'left'
	},
	details: {
		'float': 'left'
	}
};

function initMapArgs() {
	mapWidth = 540;
	mapHeight = 600;
	console.log(mapWidth);
}

function initMapLegendArgs() {
	mapLegendDomain = [50, 100, 150, 200, 300, 500];
	mapLegendRange = ['#3CB371', '#FFCC22', '#FF8800', '#E63F00', '#CC0000', '#8C0044'];
	mapLegendWidth = 100;
}

(function() {
	container = document.getElementById('container');
	initMapArgs();
	initMapLegendArgs();
})();

React.render(
	<div>
		<MapLegend style={style.mapLengend} width={mapLegendWidth} domain={mapLegendDomain} range={mapLegendRange}/>
		<TaipeiMap style={style.map} width={mapWidth} height={mapHeight} />
		<Details style={style.details}></Details>
	</div>,
	container
);