var httpUtil = require('sb-http-util');
var configUtil = require('sb-config-util');

createContent = function (data, cb) {
    setOptionsAndSendRequest('CREATE_CONTENT', data, '', cb);
}
searchContent = function (data, cb) {
    setOptionsAndSendRequest('SEARCH_CONTENT', data, '', cb);
}
updateContent = function (data, content_id, cb) {
    setOptionsAndSendRequest('UPDATE_CONTENT', data, content_id, cb);
}
getContent = function (content_id, cb) {
    setOptionsAndSendRequest('GET_CONTENT', '', content_id, cb);
}
reviewContent = function (data, content_id, cb) {
    setOptionsAndSendRequest('REVIEW_CONTENT', data, content_id, cb);
}
publishContent = function (content_id, cb) {
    setOptionsAndSendRequest('PUBLISH_CONTENT', '', content_id, cb);
}
listContent = function (data, cb) {
    setOptionsAndSendRequest('LIST_CONTENT', data, '', cb);
}
retireContent = function (data, content_id, cb) {
    setOptionsAndSendRequest('RETIRE_CONTENT', data, content_id, cb);
}
uploadContent = function (formData, content_id, cb) {
    setOptionsAndSendRequest('UPLOAD_CONTENT', formData, content_id, cb);
}
setOptionsAndSendRequest = function (name, data, content_id, cb) {
    var options_list = {
        CREATE_LIST: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_CREATE_CONTENT_URI'),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            json: true,
            body: data
        },
        SEARCH_CONTENT: {
            url: configUtil.getConfig('EKSTEP_SEARCH_API_URL') + configUtil.getConfig('EKSTEP_SEARCH_CONTENT_URI'),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            json: true,
            body: data
        },
        UPDATE_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_UPDATE_CONTENT_URI') + "/" + content_id,
            headers: {
                'Content-Type': 'application/json'
            },
            method: "PATCH",
            json: true,
            body: data
        },
        GET_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_GET_CONTENT_URI') + "/" + content_id,
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET",
            json: true
        },
        REVIEW_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_REVIEW_CONTENT_URI') + "/" + content_id,
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            json: true,
            body: data
        },
        UPLOAD_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_UPLOAD_CONTENT_URI') + '/' + content_id,
            method: "POST",
            formData: data,
            json: true
        },
        PUBLISH_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_PUBLISH_CONTENT_URI') + "/" + content_id,
            headers: {
                'Content-Type': 'application/json'
            },
            method: "GET",
            json: true
        },
        LIST_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_LIST_CONTENT_URI'),
            headers: {
                'Content-Type': 'application/json'
            },
            method: "POST",
            json: true,
            body: data
        },
        RETIRE_CONTENT: {
            url: configUtil.getConfig('EKSTEP_LEARNING_API_URL') + configUtil.getConfig('EKSTEP_RETIRE_CONTENT_URI') + '/' + content_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            method: "DELETE",
            body: data
        }
    };
    httpUtil.sendRequest(options_list[name], function (err, res, body) {
        cb(err, body);
    });
}
module.exports = {
    createContent: createContent,
    searchContent: searchContent,
    updateContent: updateContent,
    getContent: getContent,
    reviewContent: reviewContent,
    uploadContent: uploadContent,
    publishContent: publishContent,
    listContent: listContent,
    retireContent: retireContent

};
