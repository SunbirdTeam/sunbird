var restClient = require('./rest-client-service');


function createCourse(data, callback) {
    
    var dataObj =  data.request.content;
    
    if(!dataObj.name || !dataObj.description || !dataObj.code || !dataObj.mimeType) {
        callback(true, null);
    } else {
        restClient.performCreateContent(data, function (res) {
        //After check response, we perform other operation
            console.log(res);
            callback(null, res);
        });
    }
}








function searchCourse(req, res) {
    
}


function createCourseAPI(req, res) {
    
    var data = {
        "request": {
            "content": {
                "name": req.body.name,
                "description": req.body.description,
                "status": req.body.status,
                "contentType": req.body.contentType,
                "code": req.body.code,
                "mimeType": req.body.mimeType,
                "owner": req.body.owner,
                "language": req.body.language
            }
        }
    };
    
    createCourse(data, function(error, data) {
        
        if(error) {
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


module.exports.searchCourse     = searchCourse;
module.exports.createCourseAPI  = createCourseAPI;
module.exports.updateCourse     = updateCourse;
module.exports.reviewCourse     = reviewCourse;
module.exports.publishCourse    = publishCourse;
module.exports.getAllTOC        = getAllTOC;
module.exports.getMyTOC         = getMyTOC;

//fot test purpose
module.exports.createCourse = createCourse;