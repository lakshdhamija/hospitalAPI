const Report = require('../../../models/report');

module.exports.getReports = function(req, res){
    Report.find({status: req.params.status}, function(err, report){
        if(err){
            console.log('Error: ', err);
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        return res.status(200).json({
            message: `All reports with status ${req.params.status} displayed`,
            info: report
        });
    });
}