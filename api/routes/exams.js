const express = require('express');
const router = express.Router();
const Exam = require('../model/exam');
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
	return res.status(400).send({message:"To save data using this API endpoint, use the POST method passing a JSON with patientID and examData."});
});
router.post('/write', async (req, res) => {
	const {patientID, examData} = req.body;
	if (!patientID || !examData) return res.status(400).send({error: "The required fields patientID and examData are not filled"});
	try {
		const patient = await Patient.findOne({"_id": patientID});
		if (!patient) return res.status(400).send({error: "The received patientID is not registered"});
		var aneurysmLabel = false;
		if(patient.diseases.indexOf("aneurisma") >= 0) aneurysmLabel = true;
		createdExam = await Exam.create({"patientID": patientID, "examData": examData, "aneurysmProb": null, "aneurysmLabel": aneurysmLabel});
		return res.status(201).send(createdExam);
	}
	catch (err) {
		return res.status(500).send({error: "Error creating a register for the exam"});
	}
});

// Análise do exame
router.get('/analysis', (req, res) => {
		return res.status(400).send({message:"To get data from this API endpoint, use POST method, passing userID, userToken, patientID and examID as parameters."});
});
router.post('/analysis', (req, res) => {
		return res.status(501).send("Verificar se os parâmetros recebidos estão corretos; Realizar a análise dos dados com o nosso modelo; Retornar a resposta com a probabilidade de ser um quadro de aneurisma");
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
