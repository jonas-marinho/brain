const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const PatientSchema = new Schema({
	name: {type: String, required: true, default: 'Patient'},
	birthDate: {type: Date, required: true},
	diseases: {type: String, default: '[]'},
	info: {type: String, default: ''},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Patient', PatientSchema);