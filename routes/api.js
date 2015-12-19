var express = require('express');
var router = express.Router();
var _ = require('lodash');

var PersonService = require('../app/services/person');

router.get('/people', function (req, res) {
    var person = PersonService.getPerson({});

    res.json({person: person});
});

module.exports = router;
