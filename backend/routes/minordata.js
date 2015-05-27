var express = require('express');
var http = require('http');
var Q = require('q');
var router = express.Router();

router.get('/:type', function(req, res) {
	var db = req.db;
	var type = '';
	
	type = req.params.type[0].toUpperCase();
	type += req.params.type.substring(1);
	
	db.collection(type).find({}).toArray(function(err, results) {
		if (err) {
			res.status(404).json([]);
			return;
		}
		res.json(results);
	});
});


module.exports = router;