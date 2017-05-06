var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var http = require('http');
var messageUtil = require('./service/messageUtil');
var respUtil = require('response_util');

var reqMsg = messageUtil.REQUEST;
var responseCode = messageUtil.RESPONSE_CODE;
var apiVersions = messageUtil.API_VERSION;

const port = 5000;

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(methodOverride());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,PATCH,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, *');

    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    };
});

app.use(function(req, res, next) {
    res.setHeader('Connection', 'close');
    next();
});

require('./routes/courseRoutes')(app);
require('./routes/contentRoutes')(app);



http.createServer(app).listen(port);

console.log('server running at PORT [%d]', port);
