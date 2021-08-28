const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PatientSchema = new Schema({
	patientID: {type: String, default: null},
	name: {type: String, required: true, default: 'Patient'},
	cpf: {type: String, required: true},
	birthDate: {type: Date, required: true},
	diseases: {type: Array, default: []},
	info: {type: String, uniqueItems: true},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Patient', PatientSchema);
