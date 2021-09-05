const express = require('express');
const router = express.Router();
const Patient = require('../model/patient');
const Exam = require('../model/exam');
const bcrypt = require('bcrypt');

// Lista de pacientes
router.get('/', async (req, res) => {
	try {
		const patients = await Patient.find({});
		return res.send(patients);
	}
	catch (err) {
		return res.status(500).send({error:"Error on patients consult"});
	}
});

// Criar novo paciente
router.get('/create', (req, res) => {
		return res.status(400).send({message:"To create a new patient, use the post method passing a JSON with name, cpf (string with only numbers), birthDate (YYYY-MM-DD), diseases (array of strings) and info (string)"});
});
router.post('/create', async (req, res) => {
	const {name, cpf, birthDate, diseases, info} = req.body;
	
	if (!name || !cpf || !birthDate) return res.status(400).send({error: "There are required fields (name, cpf and birthDate) that are not filled"});
	
	try {
		createdPatient = await Patient.create({name: name, cpf: cpf, birthDate: birthDate, diseases: diseases, info: info});
		updatedPatient = await Patient.updateOne({"_id": createdPatient._id}, {"patientID": createdPatient._id.toString()});
		createdPatient = await Patient.findOne({"patientID": createdPatient._id.toString()});
		return res.status(201).send(createdPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error creating patient"});
	}
});


// Editar paciente
router.get('/edit', (req, res) => {
		return res.status(400).send({message:"To edit a patient, use the post method passing a JSON with patientID, name, cpf (string with only numbers), birthDate (YYYY-MM-DD), diseases (array of strings) and info (string)"});
});
router.post('/edit', async (req, res) => {
	const {patientID, name, cpf, birthDate, diseases, info} = req.body;
	
	if (!patientID || !name || !cpf || !birthDate) return res.status(400).send({error: "There are required fields (patientID, name, cpf and birthDate) that are not filled"});
	
	try {
		var editedPatient = await Patient.findOne({"patientID": patientID});
		if(!editedPatient) return res.status(400).send({error: "This patientID does not exist"});
		await Patient.updateOne({"patientID": patientID}, {name: name, cpf: cpf, birthDate: birthDate, diseases: diseases, info: info});
		editedPatient = await Patient.findOne({"patientID": patientID});
		return res.status(202).send(editedPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error editing patient"});
	}
});

// Excluir paciente
router.get('/delete', (req, res) => {
		return res.status(400).send({message:"To delete a patient, use the post method passing a JSON with patientID"});
});
router.post('/delete', async (req, res) => {
	const {patientID} = req.body;
	
	if (!patientID) return res.status(400).send({error: "The required field patientID is not filled"});
	
	try {
		var deletedPatient = await Patient.findOne({"patientID": patientID});
		if(!deletedPatient) return res.status(400).send({error: "This patientID does not exist"});
		await Patient.deleteOne({"patientID": patientID});
		return res.status(202).send(deletedPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error excluding patient"});
	}
});

// Lista de exames do paciente
router.get('/exams', (req, res) => {
		return res.status(400).send({message:"To list the exams of a patient, use the post method passing a JSON with patientID"});
});
router.post('/exams', async (req, res) => {
	const {patientID} = req.body;
	
	if (!patientID) return res.status(400).send({error: "The required field patientID is not filled"});
	
	try {
		const patient = await Patient.findOne({"patientID": patientID});
		if(!patient) return res.status(400).send({error: "This patientID does not exist"});
		const exams = await Exam.find({"patientID":patientID});
		return res.send(exams);
	}
	catch (err) {
		return res.status(500).send({error: "Error getting patient exams"});
	}
});

// Último exame do paciente
router.get('/last-exam', (req, res) => {
		return res.status(400).send({message:"To get the last exam of a patient, use the post method passing a JSON with patientID"});
});
router.post('/last-exam', async (req, res) => {
	const {patientID} = req.body;
	
	if (!patientID) return res.status(400).send({error: "The required field patientID is not filled"});
	
	try {
		const patient = await Patient.findOne({"patientID": patientID});
		if(!patient) return res.status(400).send({error: "This patientID does not exist"});
		const exams = await Exam.find({"patientID":patientID}).sort({"created":-1});
		var exam = Array();
		if(exams.length>0) exam = exams[0];
		return res.send(exam);
	}
	catch (err) {
		return res.status(500).send({error: "Error getting patient last exam"});
	}
});

module.exports = router;
