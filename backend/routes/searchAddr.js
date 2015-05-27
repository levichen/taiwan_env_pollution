var express      = require('express');
var http         = require('http');
var router       = express.Router();

var SearchAddr = require('../libs/SearchAddr.js');
var searchAddr = new SearchAddr();


// get addr = XXX
router.get('/', function(req, res, next) {
    var addr = req.query.addr;
    searchAddr.getLocationFromAddr(addr)
    .then(function(addrLocation) {
        return searchAddr.getDataFromLocation(req.db, addrLocation, 1000);
    })
    .then(function(result) {
        res.json(result);
    });
});

module.exports = router;
