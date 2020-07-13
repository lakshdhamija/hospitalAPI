const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const Doctor = require('../models/doctor');
const keys = require('../keys.json');

let opts = {
    // header has a list of keys and one is autherization and it also has further keys and one of it is bearer which will have the JWT token
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.secret  // this is decrypt key. Encrypt key in controller/api/v1/doctors_api.js
}

passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
    Doctor.findById(jwtPayLoad._id, function(err, doctor){
        if(err){console.log('Error in finding doctor from JWT', err); return;}
        if(doctor){
            return done(null, doctor);
        }else{
            return done(null, false);
        }
    });
}));

module.exports = passport;