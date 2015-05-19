var React = require('react');
var TaipeiMap = require('./taipei_map');
var MapLegend = require('./map_legend');
var Details = require('./details');
var mapWidth, mapHeight;
var mapLegendWidth, mapLegendHeight, mapLegendDomain, mapLegendRange;

var Content = React.createClass({	

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
		var style = {
			mapLengend: {
				'float': 'left'
			},
			map: {
				'float': 'left'
			},
			details: {
				'float': 'left'
			}
		};
		// var content_bg = this.porps.data.bg;
		var content_bg = 'content-bg-taipei';
		return (
			<div className="container-content center">
				<div className='content-box'>
					<MapLegend style={style.mapLengend} width={mapLegendWidth} domain={mapLegendDomain} range={mapLegendRange}/>
					<TaipeiMap style={style.map} width={mapWidth} height={mapHeight} />
					<Details style={style.details}></Details>
				</div>
				<div className={content_bg} />
			</div>
		);
	}

});

module.exports = Content;