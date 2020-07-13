// Entry point to all the routes
const express = require('express');
const router = express.Router();

router.use('/api', require('./api')); // require index.js in api folder if incoming request is /api

module.exports = router; // exporting to make available to main index.js