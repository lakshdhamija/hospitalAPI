const express = require('express');
const router = express.Router();
const patientsApi = require('../../../controllers/api/v1/patients_api');
const passport = require('passport');

// router.post('/create-session', usersApi.createSession);
router.post('/register', passport.authenticate('jwt', {session: false}), patientsApi.register);
router.post('/:id/create_report', passport.authenticate('jwt', {session: false}), patientsApi.createReport);
router.get('/:id/all_reports', patientsApi.allReports);


module.exports = router;