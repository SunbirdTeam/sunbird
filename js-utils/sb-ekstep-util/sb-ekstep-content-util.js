var httpUtil = require('sb-http-util');
var configUtil = require('sb-config-util');
createContent = function (data, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_CREATE_CONTENT_URI'),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: true,
        body: data

    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
searchContent = function (data, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_SEARCH_CONTENT_URI'),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: true,
        body: data

    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
updateContent = function (data, content_id, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_UPDATE_CONTENT_URI') + "/" + content_id,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "PATCH",
        json: true,
        body: data

    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
getContent = function (content_id, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_GET_CONTENT_URI') + "/" + content_id,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"


    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
reviewContent = function (data, content_id, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_REVIEW_CONTENT_URI') + "/" + content_id,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: true,
        body: data


    };
    console.log(http_options);
    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
publishContent = function (content_id, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_PUBLISH_CONTENT_URI') + "/" + content_id,
        headers: {
            'Content-Type': 'application/json'
        },
        method: "GET"


    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
listContent = function (data, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_LIST_CONTENT_URI'),
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        json: true,
        body: data

    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
retireContent=function (data,content_id, cb) {
    var http_options = {
        url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_RETIRE_CONTENT_URI')+'/'+content_id,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        method: "DELETE",       
        body: data

    };

    httpUtil.sendRequest(http_options, function (err, res, body) {
        cb(err, body);
    });
}
module.exports = {
    createContent: createContent,
    searchContent: searchContent,
    updateContent: updateContent,
    getContent: getContent,
    reviewContent: reviewContent,
//    uploadContent: uploadContent,
    publishContent: publishContent,
    listContent: listContent,
    retireContent: retireContent

};