const express = require('express');
const path = require('path');
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJWT = require('./config/passport-jwt-strategy');


const app = express();

// if (process.env.NODE_ENV !== 'test') {
//     app.use(express.logger());
// }

app.use(express.urlencoded());

// use express router
app.use('/', require('./routes')); // redirect traffic to index.js in routes folder

app.listen(port, function (err) { // start server
    if (err) {
        console.log("Error in runnung the server", err);
        return;
    }
    console.log("Express server is running on port", port);
});

module.exports = app;