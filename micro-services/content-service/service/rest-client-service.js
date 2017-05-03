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


function performGetRequest(endPoint, cb) {

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
        return cb(data);
    });
}


module.exports.performGetRequest = performGetRequest;
module.exports.performCreateContent = performCreateContent;