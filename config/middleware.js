module.exports.UnauthError = function (err, req, res, next) {
    if (err) {
        return res.status(401).json({
            message: 'Unauthorized! Invalid or missing jwt or username or password'
        });
    }
    else
        next();
};