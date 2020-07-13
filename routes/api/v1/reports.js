const express = require('express');
const router = express.Router();
const reportsApi = require('../../../controllers/api/v1/reports_api');

router.get('/:status', reportsApi.getReports);

module.exports = router;