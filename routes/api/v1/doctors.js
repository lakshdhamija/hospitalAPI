const express = require('express');
const router = express.Router();
const doctorsApi = require('../../../controllers/api/v1/doctors_api');

router.post('/register', doctorsApi.register); // register doctor
router.post('/login', doctorsApi.login); // log-in doctor

module.exports = router;