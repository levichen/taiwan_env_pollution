var Q = require('q');

var querystring = require('querystring');
var http = require('http');

function SearchAddr() {
    this.dbCollection = ["Incinerators", "Garbage", "Petition", "Airstation", "FAPReport"];
}

SearchAddr.prototype.getLocationFromAddr = function getLocationFromAddr(addr) {
	var deffered = Q.defer();
    var addressInfo = null;
    var data = {};

    var paramter = querystring.stringify({
        address: addr,
        sensor: false
    });

    http.get('http://maps.googleapis.com/maps/api/geocode/json?' + paramter, function(res) {
        res.on('data', function(chunk) {
            if (addressInfo == null) {
                addressInfo = new Buffer(chunk);
            }
            else {
                addressInfo = Buffer.concat([addressInfo, chunk]);
            }
        });

        res.on('end', function() {
            addressInfo = JSON.parse(addressInfo.toString());
            if (addressInfo && addressInfo.results.length > 0) {
                data = {
                    lng: addressInfo.results[0].geometry.location.lng,
                    lat: addressInfo.results[0].geometry.location.lat
                };
                deffered.resolve(data);
            }
            else {
                if (addressInfo.status) {
                    deffered.reject(addressInfo.status + ',' + 
                        data.FactoryName + ',' + data.FactoryAddress);
                }
            }
        });
    });

    return deffered.promise;
}

SearchAddr.prototype.getDataFromLocation = function getDataFromLocation(db, addrLocation, distance) {
    var query = this.getDatabaseQuery(addrLocation, distance);

    var deffered = Q.defer();

    this.getDataFromDatabase(db, query)
        .then(function(rows) {
            var result = {};
            var feed = [];
            rows.forEach(function(row) {
                for(key in row) {
                    row[key].forEach(function(data) {
                        data['type'] = key;
                        feed.push(data);
                    });
                }
            });

            result['feed'] = feed;
            result['addrLocation'] = addrLocation;

            deffered.resolve(result);
        });

    return deffered.promise;
}

SearchAddr.prototype.getDataFromDatabase = function getDataFromDatabase(db, query) {
    var promises = [];

    this.dbCollection.forEach(function(collection) {
        var deffered = Q.defer();

        if (collection == 'FAPReport') {
            query.ReportPeriod = '2014第3季';
        }

        db.collection(collection).find(query, {_id: 0}).toArray(function(err, results) {
            if (err) {
                console.log(err);
            } else {
                var r = {};
                r[collection] = results;
                /*deffered.resolve(results);*/
                deffered.resolve(r);
            }
        });
        promises.push(deffered.promise);
    });

    return Q.all(promises);
}

SearchAddr.prototype.getDatabaseQuery = function getDatabaseQuery(addrLocation, distance) {
	return {
        loc: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [
                        addrLocation.lng,
                        addrLocation.lat
                    ]
                },
                $maxDistance: parseInt(distance)
            }
        }
    };
}

module.exports = SearchAddr;
