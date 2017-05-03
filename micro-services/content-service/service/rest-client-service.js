var Client = require('node-rest-client').Client;
var client = new Client();

function getBaseUrl() {
    return 'https://dev.ekstep.in/api';
}


function getHeaders() {

    var headers = {
        'Content-Type': 'application/json',
        'user-id': 'ilimi'
    };
    return headers;
}


function performGetContent(endPoint, cb) {

    var args = {
        headers: getHeaders()
    };

    var host = getBaseUrl() + '/' + endPoint;
    client.get(host, args, function (data, response) {
        return cb(data);
    });

}



function performCreateContent(data, cb) {

    var args = {
        headers: getHeaders(),
        data: data
    };

    var host = getBaseUrl() + '/' + 'learning/v2/content';
    client.post(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}

function performSearchContent(data, cb) {

    var args = {
        headers: getHeaders(),
        data: data
    };

    var host = getBaseUrl() + '/' + 'search/v2/search';
    client.post(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}


module.exports.performGetContent    = performGetContent;
module.exports.performSearchContent = performSearchContent;
module.exports.performCreateContent = performCreateContent;