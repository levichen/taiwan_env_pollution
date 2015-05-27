var express = require('express');
var http = require('http');
var Q = require('q');
var router = express.Router();



router.get('/factory_pollution_report', function(req, res) {
	var db = req.db;

	db.collection('FAPReport').find({
		ReportPeriod: '2014第3季'
	}).toArray(function(err, result) {
		if (err) {
			res.status(500).json([]);
			return;
		}
		res.json(result);
	});
});

router.get('/now', function(req, res, next) {
	Q.all([
		getSiteInfo(),
		getAirQuality()
	]).then(function(item) {
		var result = item[0];
		for (var i = 0; i < result.length; i++) {
			result[i]['loc'] = {
				lng: result[i].TWD97Lon,
				lat: result[i].TWD97Lat
			};
			delete result[i].TWD97Lon;
			delete result[i].TWD97Lat;

			for (var j = 0; j < item[1].length; j++) {
				if (result[i].SiteName.indexOf(item[1][j].SiteName) >= 0) {
					result[i]['AirQuility'] = item[1][j];
				}
			}
		}
		return result;
	}).then(function(data) {
		res.json(data);
	}).fail(function(err) {
		console.log(err);
	}).done();
});

function getSiteInfo() {
	var deffered = Q.defer();

	http.get({
		host: 'opendata.epa.gov.tw',
		port: 80,
		path: '/ws/Data/AQXSite/?$orderby=SiteName&$skip=0&$top=1000&format=json'
	}, function(res) {
		var data = null;

		res.on('data', function(chunk) {
			if (data === null) {
				data = new Buffer(chunk);
			}
			else {
				data = Buffer.concat([data, chunk]);
			}
		});

		res.on('end', function() {
			try {
				var result = JSON.parse(data);
				deffered.resolve(result);
			} catch(e) {
				deffered.reject(e);
			}
		});
	});

	return deffered.promise;
}

function getAirQuality() {
	var deffered = Q.defer();

	http.get({
		host: 'opendata.epa.gov.tw',
		port: 80,
		path: '/ws/Data/AQX/?$orderby=SiteName&$skip=0&$top=1000&format=json'
	}, function(res) {
		var data = null;

		res.on('data', function(chunk) {
			if (data === null) {
				data = new Buffer(chunk);
			}
			else {
				data = Buffer.concat([data, chunk]);
			}
		});

		res.on('end', function() {
			try {
				deffered.resolve(JSON.parse(data))
			} catch(e) {
				deffered.reject(e);
			}
		})
	});

	return deffered.promise;
}

module.exports = router;
