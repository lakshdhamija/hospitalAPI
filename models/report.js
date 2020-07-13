const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['Negative', 'Travelled-Quarantine', 'Symptoms-Quarantine', 'Positive-Admit'],
        required: true
    },
    doctorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    },
    patientName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    }
},
    {
        timestamps: true
    });
const Report = mongoose.model('Report', reportSchema);
module.exports = Report;