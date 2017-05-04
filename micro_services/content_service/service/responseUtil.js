const uuidV1 = require('uuid/v1');

function successResponse(data) {

    response = {}
    response.id = data.id;
    response.ver = data.version;
    response.ts = new Date();

    response.params = getParams(null, null, "successful", null)
    response.responseCode = "OK"
    response.result = data.result;

    return response;
}

function errorResponse(data) {

    response = {}
    response.id = data.id;
    response.ver = data.version;
    response.ts = new Date();

    response.params = getParams(data.msgId, data.errCode, "failed", data.errMsg);
    response.responseCode = data.responseCode
    response.result = data.result;

    return response;
}

function getParams(msgId, errCode, status, msg) {
    params = {}
    params.resmsgid = generateUUID();
    params.msgid = msgId;
    params.err = errCode
    params.status = status;
    params.errmsg = msg;
    
    return params;
}

function generateUUID() {
    return uuidV1();  
}


exports.ERROR_CODE = {
    SAVE_COURSE_FAILED : "SAVE_COURSE_FAILED",
    ERR_COURSE_INVALID_OBJECT : "ERR_COURSE_INVALID_OBJECT"
}

exports.ERROR_MESSAGE = {
    VALIDATION_ERROR : "Validation Errors",
    INVALID_REQUEST : "Invalid Request",
    EKSTEP_ERROR : "Ekstep reject the api"



}

exports.RESPONSE_CODE = {
    CLIENT_ERROR : "CLIENT_ERROR"
}

exports.GENERIC_MESSAGE = {
    NAME_FIELD_REQUIRED : "Required Metadata name not set",
    DESCRIPTION_FIELD_REQUIRED : "Required metadata description not set"
}


module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;