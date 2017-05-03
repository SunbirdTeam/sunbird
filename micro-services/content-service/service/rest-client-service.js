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

function performUpdateContent(data, cb) {

    var args = {
        headers: getHeaders(),
        data: data
    };

    var host = getBaseUrl() + '/' + 'learning/v2/content/' + data.contentId;
    client.patch(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}

function performReviewContent(data, cb) {

    var args = {
        headers: getHeaders(),
        data: data
    };

    var host = getBaseUrl() + '/' + 'learning/v3/content/review/' + data.contentId;
    client.post(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}

function performPublishContent(data, cb) {

    var args = {
        headers: getHeaders()
    };

    var host = getBaseUrl() + '/' + 'learning/v2/content/publish/' + data.contentId;
    client.get(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}

function performGetContent(data, cb) {

    var args = {
        headers: getHeaders()
    };

    var host = getBaseUrl() + '/' + 'learning/v2/content/' + data.contentId;
    client.get(host, args, function (data, response) {
        if (!data) {
            cb(true, null);
        } else {
            cb(null, data);
        }
    });
}


module.exports.performSearchContent     = performSearchContent;
module.exports.performCreateContent     = performCreateContent;
module.exports.performUpdateContent     = performUpdateContent;
module.exports.performReviewContent     = performReviewContent;
module.exports.performPublishContent    = performPublishContent;
module.exports.performGetContent        = performGetContent;