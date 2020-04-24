const router = require('express').Router();

let agenda = require('../jobs/agenda');

router.get('/', agenda);

module.exports = router;