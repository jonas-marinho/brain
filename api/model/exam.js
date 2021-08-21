const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const ExamSchema = new Schema({
	examID: {type: String, default: null},
	deviceID: {type: String, required: true, default: null},
	patientID: {type: String, default: null},
	examData: {type: String, required: true},
	aneurysmProbClassifier: {type: Number, default: null},
	aneurysmProbRegressor: {type: Number, default: null},
	aneurysmLabel: {type: Boolean, default: null},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Exam', ExamSchema);
