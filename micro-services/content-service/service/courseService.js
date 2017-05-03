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
 * Wrapper function to search function
 * @param {object} req
 * @param {object} res
 */
function searchCourseAPI(req, res) {

    var data = req.body.request;

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

    var data = req.body.request;

    createCourse(data, function (error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


function updateCourse(req, res) {

}


function reviewCourse(req, res) {

}


function publishCourse(req, res) {

}

function getAllTOC(req, res) {

}

function getMyTOC(req, res) {

}


module.exports.searchCourseAPI = searchCourseAPI;
module.exports.createCourseAPI = createCourseAPI;
module.exports.updateCourse = updateCourse;
module.exports.reviewCourse = reviewCourse;
module.exports.publishCourse = publishCourse;
module.exports.getAllTOC = getAllTOC;
module.exports.getMyTOC = getMyTOC;

//fot test purpose
module.exports.createCourse = createCourse;
module.exports.searchCourse = searchCourse;