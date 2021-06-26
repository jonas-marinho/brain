const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ExamSchema = new Schema({
	patientID: {type: String, required: true},
	examData: {type: String, required: true},
	aneurysmProb: {type: Number, default: null},
	aneurysmLabel: {type: Boolean, required: true},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Exam', ExamSchema);
