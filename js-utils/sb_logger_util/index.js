/*
 * @file: index.js
 * @author: Anuj Gupta
 * @desc: using log4s, enables application wide logging.
 */
var log4js          = require('log4js');
var log4js_extend   = require('log4js-extend');
var path            = require('path');

log4js_extend(log4js, {
  path: __dirname,
  format: "at @name (@file:@line:@column)"
});

var logdir          = path.join(__dirname, '../../');
var logconfig       = require('./log4js.json', { cwd: logdir });
log4js.configure(logconfig);
var logger          = log4js.getLogger('api');

var getLogger = function() {
    return logger;
};

exports.logger = getLogger();
