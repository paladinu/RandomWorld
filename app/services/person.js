'use strict';

var _ = require('lodash');
var randomService = require('../../app/services/random');

var SETTINGS_DEFAULTS = {
    hair_length: [
        { value: 'short', percent: 25 },
        { value: 'long', percent: 40 },
        { value: 'braided', percent: 10 },
        { value: 'very short', percent: 15 },
        { value: 'bald', percent: 10 }
    ],
    hair_color: [
        { value: 'brown', percent: 25 },
        { value: 'blonde', percent: 25 },
        { value: 'black', percent: 25 },
        { value: 'red', percent: 10 },
        { value: 'light-brown', percent: 10 }, 
        { value: 'silver', percent: 5 }]
};

function generateResults(options) {
    var returnValue = null;
    var x = randomService.GenerateRandomNumber();

    var position = 0;
    _.forEach(options, function (option) {
        position += option.percent;
        if(position > x  && returnValue === null) {
            returnValue = option.value;
        }
    });
    //We might have generated a number outside of the range of values.  Just punt and pick the first value
    if(returnValue === null)
        returnValue = options[0].value;

    return returnValue;
}

exports.getPerson = function (settingsObj) {
    var options = SETTINGS_DEFAULTS;

    var results = {};
    
    for(var propertyName in options) {
        results[propertyName] = generateResults(options[propertyName]);
    }
    
    return results;
};
