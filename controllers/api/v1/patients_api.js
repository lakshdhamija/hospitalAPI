const Patient = require('../../../models/patient');
// const Report = require('../../../models/report');
const keys = require('../../../keys.json');
const jwt = require('jsonwebtoken');

module.exports.register = function (req, res) {
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
            })
        }
        else {
            return res.json(200, {
                message: 'Already Registered!',
                info: patient
            })
        }
    }).populate('doctorName');
};

// module.exports.createReport = async function (req, res) {
//     const doctorToken = req.headers.authorization;
//     const token = doctorToken.split(' ');
//     const original = jwt.verify(token[1], keys.secret); // token[1] is the payload
//     try {
//         let report = await Report.create({
//             status: req.body.status,
//             doctor: decoded._id,
//             patient: req.params.id
//         });

//         return res.status(200).json({
//             message: 'New Report Generated!',
//             details: report
//         })
//     }
//     catch (err) {
//         if (err) {
//             console.log(`${err}`);
//             return res.status(500).json({
//                 message: 'Error Occured'
//             })
//         }
//     }
// };