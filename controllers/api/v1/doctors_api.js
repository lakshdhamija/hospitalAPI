
const Doctor = require('../../../models/doctor');
// const jwt = require('jsonwebtoken');

// module.exports.createSession = async function(req, res){
//     try{
//         let user = await User.findOne({email: req.body.email});
//         if(!user || user.password != req.body.password){
//             return res.json(422, {
//                 message: 'Invalid Username/ Password'
//             });
//         }
//         return res.json(200, {
//             message: 'Sign in successful, here is your token, please keep it safe!',
//             data: {
//                 token: jwt.sign(user.toJSON(), 'codeial', {expiresIn: '100000'}) // user.toJSON() part will get encrypted. 'codial' is encrypt key. Decrypt key in passport-jwt-strategy
//             }
//         });
//     }catch(err){
//         console.log(err);
//         return res.json(500, {
//             message: "Internal Server Error"
//         });
//     }
// }

module.exports.register = function (req, res) {
    Doctor.findOne({ username: req.body.username }, function (err, doctor) {
        if (err) {
            console.log('Error:', err);
            return res.json(500, {
                message: "Internal Server Error"
            });
        }
        if (!doctor) { // if user doesn't exist, create user
            Doctor.create(req.body, function (err, doctor) {
                if (err) {
                    console.log('Error: ', err)
                    return res.json(500, {
                        message: "Error in creating Doctor"
                    });
                }
                return res.json(200, {
                    message: 'Doctor has registered successfully!'
                });
            });
        } else { // if user exists then redirect to sign up page
            return res.json(409, {
                message: "Doctor already registered"
            })
        }
    });
}