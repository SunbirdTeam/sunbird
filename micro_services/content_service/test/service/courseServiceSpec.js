function runTest() {

    var frisby = require('frisby');
    var BASE_URL = "http://localhost:5000/api/sb/v1/course";

    frisby.create('Get all the courses')
        .post(BASE_URL + "/search", {
            "request": {
                "offset": 0,
                "limit": 5
            }
        })
        .expectStatus(200)
        .toss();

}

runTest();
