'use strict';

var _ = require('lodash');
var randomService = require('../../app/services/random');

var SETTINGS_DEFAULTS = {
    hair_length: [
        { value: 'short', percent: 25 },
        { value: 'long', percent: 50 },
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
    console.log(x);

    var position = 0;
    _.forEach(options, function (option) {
        position += option.percent;
        if(position > x  && returnValue === null) {
            returnValue = option.value;
        }
    });

    return returnValue;
}

exports.getPerson = function (settingsObj) {
    var options = SETTINGS_DEFAULTS;

    var results = {};
    
    results["hair_length"] = generateResults(options.hair_length);
    results["hair_color"] = generateResults(options.hair_color);
     
    return results;
};
