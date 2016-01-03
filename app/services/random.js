'use strict';

function generateRandomNumber(){
    return Math.floor((Math.random() * 100) + 1);
}

exports.GenerateRandomNumber = function () {
    return generateRandomNumber();
};