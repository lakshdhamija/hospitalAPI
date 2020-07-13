const express =  require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');

const app = express();

app.use(express.urlencoded());

// use express router
app.use('/', require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log("Error in runnung the server", err);
        return;
    }
    console.log("Express server is running on port", port);
});