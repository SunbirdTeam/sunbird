var restClient = require('./rest-client-service');


/**
 * This function first check all the required params, and then create course in ekstep, After that we store in cache
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */
function createCourse(data, callback) {

    var dataObj = data.request.content;

    //We check all required parameters

    if (!dataObj.name || !dataObj.description || !dataObj.code || !dataObj.mimeType) {
        callback(true, null);
    } else {
        restClient.performCreateContent(data, function (err, res) {
            //After check response, we perform other operation
            if (err) {
                callback(err, null);
            } else {
                callback(null, res);
            }
        });
    }
}


/**
 * Search the content from the ekstep
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */
function searchCourse(data, callback) {

    restClient.performSearchContent(data, function (err, res) {
        //After check response, we perform other operation
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


/**
 * update metadata of the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function updateCourse(data, callback) {

    restClient.performUpdateContent(data, function (err, res) {
        //After check response, we perform other operation
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

/**
 * review the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function reviewCourse(data, callback) {

    restClient.performReviewContent(data, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

/**
 * publish the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function publishCourse(data, callback) {

    restClient.performPublishContent(data, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}

/**
 * get All the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function getAllTOC(data, callback) {

    restClient.performGetContent(data, function (err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


/**
 * Wrapper function to search function
 * @param {object} req
 * @param {object} res
 */
function searchCourseAPI(req, res) {

    var data = req.body;

    searchCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

/**
 * wrapper function for create course
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function createCourseAPI(req, res) {

    var data = req.body;

    createCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


function updateCourseAPI(req, res) {

    var data = req.body;
    data.contentId = req.params.contentId;

    updateCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

function reviewCourseAPI(req, res) {
    
    var data = {};
    data.contentId = req.params.contentId;

    reviewCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


function publishCourseAPI(req, res) {
    
    var data = {};
    data.contentId = req.params.contentId;

    publishCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });

}

function getAllTOCAPI(req, res) {
    
    var data = {};
    data.contentId = req.params.contentId;

    getAllTOC(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

function getMyTOCAPI(req, res) {
    
    var data = req.body;

    searchCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


module.exports.searchCourseAPI  = searchCourseAPI;
module.exports.createCourseAPI  = createCourseAPI;
module.exports.updateCourseAPI  = updateCourseAPI;
module.exports.reviewCourseAPI  = reviewCourseAPI;
module.exports.publishCourseAPI = publishCourseAPI;
module.exports.getAllTOCAPI     = getAllTOCAPI;
module.exports.getMyTOCAPI      = getMyTOCAPI;

//fot test purpose
module.exports.createCourse     = createCourse;
module.exports.searchCourse     = searchCourse;
module.exports.updateCourse     = updateCourse;
module.exports.reviewCourse     = reviewCourse;
module.exports.publishCourse    = publishCourse;
module.exports.getAllTOC        = getAllTOC;
//module.exports.getMyTOC         = getMyTOC;