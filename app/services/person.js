'use strict';

var _ = require('lodash');
var randomService = require('../../app/services/random');

var SETTINGS_DEFAULTS = {
    hair_length: { values: [
        { value: 'short', percent: 25 },
        { value: 'long', percent: 40 },
        { value: 'braided', percent: 10 },
        { value: 'very short', percent: 15 },
        { value: 'bald', percent: 10 }
    ]},
    sex:{values:[
        { value: 'male', percent: 50},
        { value: 'female', percent: 50}                
    ]},
    hair_color: {values: [
        { value: 'brown', percent: 25 },
        { value: 'blonde', percent: 25 },
        { value: 'black', percent: 25 },
        { value: 'red', percent: 10 },
        { value: 'light-brown', percent: 10 }, 
        { value: 'silver', percent: 5 }]},
    facial_hair: {
        dependency: 'sex',
        dependencyOptions: ['male'],
        values:[
        { value: 'beard', percent: 100 }
    ]} 
};

function resolveProperties(results, options){
    var isWorkDone = false;
    for(var propertyName in options) {
        var option = options[propertyName];
        
        var hasNoDependency = !option.hasOwnProperty('dependency');
        var hasDependencyWithNoOptions = results.hasOwnProperty(option.dependency) && !option.hasOwnProperty('dependencyOptions');
        var hasDependency =  results.hasOwnProperty(option.dependency);
        var hasMatchingOption = _.contains(option.dependencyOptions, results[option.dependency]); 
        var hasDependencyWithMatchingOption = hasDependency && hasMatchingOption; 
        if(hasNoDependency || hasDependencyWithNoOptions || hasDependencyWithMatchingOption){
            isWorkDone = true;
            results[propertyName] = generateResults(option.values); 
            delete options[propertyName];   
        }
        if(hasDependency && !hasMatchingOption){
            isWorkDone = true;
            delete options[propertyName];
        }
    }
    if(isWorkDone){
        resolveProperties(results, options);
    }
}

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
    
    var localOptions = _.extend({}, options);
    
    resolveProperties(results, localOptions);
    
    return results;
};
