'use strict';

var _ = require('lodash');

var SETTINGS_DEFAULTS = {
    hair_length: [ {value:'bald', percent: 50}, {value: 'long', percent: 50} ],
    hair_color: [ {value: 'red', percent: 10}, {value: 'brown', percent: 75}, {value: 'green', percent: 15} ]
};

function generateResults(options) {
    var returnValue;
    var x = 75;

    var position = 0;
    _.forEach(options, function (option) {
        position += option.percent;
        if(position > x) {
            returnValue = option.value;
        }
    });

    return returnValue;
}

exports.getPerson = function (settingsObj) {
    var options = SETTINGS_DEFAULTS;

    return {
        hair_length: generateResults(options.hair_length),
        hair_color: generateResults(options.hair_color)
    };
};
