const express = require('express');
const router = express.Router();
const Exam = require('../model/exam');
const User = require('../model/user');
const Patient = require('../model/patient');
const bcrypt = require('bcrypt');

// Lista de exames
router.get('/', async (req, res) => {
	try {
		const exams = await Exam.find({});
		return res.send(exams);
	}
	catch (err) {
		return res.status(500).send({error:"Error on exams consult"});
	}
});

// Gravação de dados do exame
router.get('/write', (req, res) => {
	return res.status(400).send({message:"To save data using this API endpoint, use the POST method passing a JSON with deviceID and examData."});
});
router.post('/write', async (req, res) => {
	const {deviceID, examData} = req.body;
	if (!deviceID || !examData) return res.status(400).send({error: "The required fields deviceID and examData are not filled"});
	try {
		createdExam = await Exam.create({"deviceID": deviceID, "examData": examData});
		updatedExam = await Exam.updateOne({"_id": createdExam._id}, {"examID": createdExam._id.toString()});
		createdExam = await Exam.findOne({"examID": createdExam._id.toString()});
		return res.status(201).send(createdExam);
	}
	catch (err) {
		return res.status(500).send({error: "Error creating a register for the exam: " + err});
	}
});

// Obtenção dos dados do exame
router.get('/get', (req, res) => {
	return res.status(400).send({message:"To get exam data using this API endpoint, use the POST method passing a JSON with userID and patientID."});
});
router.post('/get', async (req, res) => {
	const {userID, patientID} = req.body;
	if (!userID || !patientID) return res.status(400).send({error: "The required fields userID and patientID are not filled"});
	try {
		const user = await User.findOne({"_id": userID});
		if (!user) return res.status(400).send({error: "The received user is not registered"});
		deviceID = user.deviceID;
		const patient = await Patient.findOne({"_id": patientID});
		if (!patient) return res.status(400).send({error: "The received patientID is not registered"});
		var exam = await Exam.find({"deviceID": deviceID, "patientID": null}).sort({"created": -1});
		if (exam.length == 0) return res.status(400).send({error: "There is no avaiable exam to register to this user"});
		exam = exam[0];
		// Só considerar válido se o exame tiver sido realizado até 20 min antes
		if(Date.now() - exam.created > (20 * 60 * 1000)) return res.status(400).send({error: "The last exam for this user has expired " + (parseInt((Date.now() - exam.created) / 60000) - 20).toString() + " minutes ago"});
		var aneurysmLabel = null;
		if(patient.diseases.indexOf("aneurisma") >= 0) aneurysmLabel = true;
		updatedExam = await Exam.updateOne({"_id": exam._id}, {"patientID": patientID, "aneurysmLabel": aneurysmLabel});
		exam = await Exam.findOne({"_id": exam._id});
		return res.status(201).send(exam);
	}
	catch (err) {
		return res.status(500).send({error: "Error defining a patient for the exam"});
	}
});

// Análise do exame
router.get('/analysis', (req, res) => {
		return res.status(400).send({message:"To get data from this API endpoint, use POST method, passing a JSON with examID."});
});
router.post('/analysis', async (req, res) => {
	const {examID} = req.body;
	if(!examID) return res.status(400).send({error: "The required field examID is not filled"});
console.log("Analysing exam with id:" + examID);
	
	try {
		exam = await Exam.findOne({"examID": examID});
		if(!exam) return res.status(400).send({error: "This examID does not exist"});
		data = exam.examData;
	}
	catch (err) {
		return res.status(500).send({error: "Error analysing exam: " + err});
	}
	
	const {exec} = require("child_process");
	exec('python3 brain/api/predict/brain_predict.py "' + data + '"', async (error, stdout, stderr) => {
		if (error) {return res.status(500).send({error: error.message});}
		if (stderr) {return res.status(500).send({error: stderr});}
		const analysis = JSON.parse(stdout);
		await Exam.updateOne({"examID": examID}, {"aneurysmProbClassifier": parseFloat(analysis.classifier), "aneurysmProbRegressor": parseFloat(analysis.regressor)});
		updatedExam = await Exam.findOne({"examID": examID});
		return res.status(200).send(updatedExam);
	});
});

// Label do exame
router.get('/label', (req, res) => {
	return res.status(400).send({message:"To update the aneurysmLabel of the exam, use the POST method passing a JSON with examID and newLabel (boolean)."});
});
router.post('/label', async (req, res) => {
	const {examID, newLabel} = req.body;
	if(!examID || newLabel == undefined) return res.status(400).send({error: "The required fields examID and newLabel are not filled"});
	
	try {
		exam = await Exam.findOne({"_id": examID});
		if(!exam) return res.status(400).send({error: "This examID does not exist"});
		await Exam.updateOne({"_id": examID}, {"aneurysmLabel": newLabel});
		exam = await Exam.findOne({"_id": examID});
		return res.status(202).send(exam);
	}
	catch (err) {
		return res.status(500).send({error: "Error editing exam"});
	}
});

module.exports = router;
