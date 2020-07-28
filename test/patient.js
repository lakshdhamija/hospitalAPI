// Set node evnironment as test.
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Patient = require('../models/patient');
let Doctor = require('../models/doctor');
let Report = require('../models/report');
let chai = require('chai');
let chaiHttp = require('chai-http');
const jwt = require("jsonwebtoken");
const keys = require('../keys.json');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

describe('Patients', () => {
    let testDoc = ''; // creating test doc for registering user
    let testTok = ''; // creating jwt generated when doctor logs in
    beforeEach((done) => {
        Patient.deleteMany({}, (err) => { });
        Report.deleteMany({}, (err) => { });
        Doctor.deleteMany({}, (err) => {
            testDoc = new Doctor({ username: 'doctor', password: "123", name: 'doctor' });
            testDoc.save((err, doctor) => {
                testTok = jwt.sign(doctor.toJSON(), keys.secret, { expiresIn: 100000 });
                done();
            });
        });
    });

    // Testing for patients/register route :-
    describe('/POST patients/register', () => {
        let invalidUser1 = {
            phone: 9876543210
        }
        let invalidUser2 = {
            name: 'patient'
        }
        let validUser = {
            phone: 9876543210,
            name: 'patient'
        }

        // no jwt passed
        it('should return an Unauthorized error while registering patient (no jwt passed)', (done) => {
            chai.request(server)
                .post('/api/v1/patients/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql("Unauthorized! Invalid or missing jwt");
                    done();
                });
        });

        // missing parameters while registering
        it('should return an error while registering patient (missing name)', (done) => {
            chai.request(server)
                .post('/api/v1/patients/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({ "Authorization": `Bearer ${testTok}` })
                .send(invalidUser1)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql("Error in creating Patient");
                    done();
                });
        });
        it('should return an error while registering patient (missing phone)', (done) => {
            chai.request(server)
                .post('/api/v1/patients/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({ "Authorization": `Bearer ${testTok}` })
                .send(invalidUser2)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql("Error in creating Patient");
                    done();
                });
        });

        // Patient Registered successfully
        it('should create a patient', (done) => {
            chai.request(server)
                .post('/api/v1/patients/register')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({ "Authorization": `Bearer ${testTok}` })
                .send(validUser)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Patient Registered successfully');
                    res.body.should.have.property('info');
                    res.body.info.should.have.property('phone');
                    res.body.info.should.have.property('name');
                    done();
                });
        });
    });

    // Testing for /patients/:id/create_report route :-
    describe('/POST patients/:id/create_report', () => {
        let report = {
            status: 'Negative'
        }

        // no jwt passed
        it('should return an Unauthorized error while creating report (no jwt passed)', (done) => {
            chai.request(server)
                .post('/api/v1/patients/5f1ff515fbffdd3148d5243f/create_report')
                .set('content-type', 'application/x-www-form-urlencoded')
                .send(report)
                .end((err, res) => {
                    // console.log(res.body);
                    res.should.have.status(401);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Unauthorized! Invalid or missing jwt');
                    done();
                });
        });

        // Incorrect Patient ID
        it('should give an error in creating report due to incorrect patient id', (done) => {
            chai.request(server)
                .post('/api/v1/patients/wrongid/create_report')
                .set('content-type', 'application/x-www-form-urlencoded')
                .set({ "Authorization": `Bearer ${testTok}` })
                .send(report)
                .end((err, res) => {
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql("Error in creating Report, Patient ID or status incorrect");
                    done();
                });
        });

        // Incorrect Status
        it('should give an error in creating report due to incorrect status', (done) => {
            let patient = new Patient({phone: '0123456789', name: 'patient', doctorName: testDoc._id});
            patient.save((err, patient) => {
                chai.request(server)
                    .post(`/api/v1/patients/${patient.id}/create_report`)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set({ "Authorization": `Bearer ${testTok}` })
                    .send({ status: "gkfkjgdf" })
                    .end((err, res) => {
                        // console.log(res.body);
                        res.should.have.status(500);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message');
                        res.body.message.should.be.eql("Error in creating Report, Patient ID or status incorrect");
                        done();
                    });
            });
        });

        // Report created successfully
        it('should generate report', (done) => {
            let patient = new Patient({phone: '0123456789', name: 'patient', doctorName: testDoc._id});
            patient.save((err, patient) => {
                chai.request(server)
                    .post(`/api/v1/patients/${patient._id}/create_report`)
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set({ "Authorization": `Bearer ${testTok}` })
                    .send({ status: "Positive-Admit" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message');
                        res.body.message.should.be.eql('Patient\'s Report generated successfully');
                        res.body.should.have.property('info');
                        res.body.info.should.be.a('object')
                        res.body.info.should.have.property('status');
                        res.body.info.should.have.property('doctorName');
                        res.body.info.should.have.property('patientName');
                        res.body.info.status.should.be.eql('Positive-Admit');
                        done();
                    });
            });
        });
    });
});