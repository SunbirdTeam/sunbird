/*
 * @file: index.js
 * @author: Anuj Gupta
 * @desc: using log4s, enables application wide logging.
 */
var Validator = require('validatorjs');

function validate(data, rules) {

    var validation = new Validator(data, rules);
    return validation.passes();
}

module.exports = {
    validate: validate
};
