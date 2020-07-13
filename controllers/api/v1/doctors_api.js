
const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');
const keys = require('../../../keys.json');

module.exports.login = async function(req, res){
    try{
        let doctor = await Doctor.findOne({username: req.body.username});
        if(!doctor || doctor.password != req.body.password){
            return res.json(422, {
                message: 'Invalid Username/ Password'
            });
        }
        return res.json(200, {
            message: 'Sign in successful, here is your token, please keep it safe!',
            data: {
                token: jwt.sign(doctor.toJSON(), keys.secret, {expiresIn: '7d'}) // doctor.toJSON() part will get encrypted. hospitalapi is encrypt key. Decrypt key in passport-jwt-strategy
            }
        });
    }catch(err){
        console.log(err);
        return res.json(500, {
            message: "Internal Server Error"
        });
    }
}

module.exports.register = function (req, res) {
    Doctor.findOne({ username: req.body.username }, function (err, doctor) {
        if (err) {
            console.log('Error:', err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
        if (!doctor) { // if doctor doesn't exist, create doctor
            Doctor.create(req.body, function (err, doctor) {
                if (err) {
                    console.log('Error: ', err)
                    return res.json(500, {
                        message: "Error in creating Doctor"
                    });
                }
                return res.json(200, {
                    message: 'Doctor has been registered successfully!',
                    info: doctor
                });
            });
        } else { // if doctor exists then redirect to sign up page
            return res.json(409, {
                message: "Doctor already registered"
            })
        }
    });
}