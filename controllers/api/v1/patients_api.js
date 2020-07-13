const Patient = require('../../../models/patient');
const Report = require('../../../models/report');
const keys = require('../../../keys.json');
const jwt = require('jsonwebtoken');

module.exports.register = function (req, res) { // register controller for patients
    const doctorToken = req.headers.authorization;
    const token = doctorToken.split(' ');
    const original = jwt.verify(token[1], keys.secret); // token[1] is the payload
    Patient.findOne({ phone: req.body.phone }, function (err, patient) {
        if (err) {
            console.log('Error:', err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
        if (!patient) {
            const doctorName = (original._id);
            req.body.doctorName = doctorName; // adding doctor id to body and it will be passed in req.body to Patient.create
            Patient.create(req.body, function (err, patient) {
                if (err) {
                    console.log('Error: ', err)
                    return res.json(500, {
                        message: "Error in creating Patient"
                    });
                }
                return res.json(200, {
                    message: 'Patient Registered successfully',
                    info: patient
                });
            });
        }
        else {
            return res.json(200, {
                message: 'Already Registered!',
                info: patient
            })
        }
    }).populate('doctorName');
};

module.exports.createReport = function (req, res) { // create report of patient
    const doctorToken = req.headers.authorization;
    const token = doctorToken.split(' ');
    const original = jwt.verify(token[1], keys.secret); // token[1] is the payload
    const doctorName = original._id;
    const patientName = req.params.id;
    req.body.doctorName = doctorName;
    req.body.patientName = patientName;

    Report.create(req.body, function (err, report) {
        if (err) {
            console.log('Error: ', err)
            return res.json(500, {
                message: "Error in creating Report"
            });
        }
        return res.json(200, {
            message: 'Patient\'s Report generated successfully',
            info: report
        });
    });
};

module.exports.allReports = async function (req, res) { // view all reports of patient
    try {
        const report = await Report.find({ patientName: req.params.id }).populate('doctorName').populate('patientName');
        return res.status(200).json({
            message: 'All reports of patient displayed',
            info: report
        });
    }
    catch (err) {
        if (err) {
            console.log('Error: ', err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
    }
};