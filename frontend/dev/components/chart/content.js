var React = require('react');
var Map = require('./map');
var MapLegend = require('./map_legend');
var Details = require('./details');
var mapWidth, mapHeight;
var mapLegendWidth, mapLegendHeight, mapLegendDomain, mapLegendRange;

var Content = React.createClass({	

	initMapArgs: function() {
		mapWidth = 540;
		mapHeight = 600;	
	},
	initMapLegendArgs: function() {
		mapLegendDomain = [50, 150, 350, 420];
		// mapLegendRange = ['#3CB371', '#FFCC22', '#FF8800', '#E63F00', '#CC0000', '#8C0044'];
		mapLegendWidth = 100;
	},
	componentWillMount: function() {
		this.initMapArgs();
		this.initMapLegendArgs();
	},
	render: function() {
		// var content_bg = this.porps.data.bg;
		var content_bg = 'content-bg-taipei';
		return (
			<div className="container-content center">
				<div className='content-box'>
					<MapLegend width={mapLegendWidth} domain={mapLegendDomain}/>
					<Map width={mapWidth} height={mapHeight} />
					<Details></Details>
				</div>
				<div className={content_bg} />
			</div>
		);
	}

});

module.exports = Content;