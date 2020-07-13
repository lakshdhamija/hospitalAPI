const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    phone: {
        type     : Number,
        required : true,
        unique   : true
      },
    name: {
        type: String,
        required: true
    },
    doctorName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
        required: true
    }
},{
    timestamps: true
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;