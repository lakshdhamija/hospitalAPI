const express = require('express');
const router = express.Router();

router.use('/v1', require('./v1')); // forward to index.js in v1

module.exports = router;