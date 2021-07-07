const express = require('express');
const router = express.Router();
const Patient = require('../model/patient');
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
		return res.status(201).send(createdPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error creating patient"});
	}
});


// Editar paciente
router.get('/edit', (req, res) => {
		return res.status(400).send({message:"To edit a patient, use the post method passing a JSON with id, name, cpf (string with only numbers), birthDate (YYYY-MM-DD), diseases (array of strings) and info (string)"});
});
router.post('/edit', async (req, res) => {
	const {name, cpf, birthDate, diseases, info} = req.body;
	
	if (!id || !name || !cpf || !birthDate) return res.status(400).send({error: "There are required fields (id, name, cpf and birthDate) that are not filled"});
	
	try {
		var editedPatient = await Patient.findOne({"_id": id});
		if(!editedPatient) return res.status(400).send({error: "This patient id does not exist"});
		await Patient.updateOne({"_id": id}, {name: name, cpf: cpf, birthDate: birthDate, diseases: diseases, info: info});
		editedPatient = await Patient.findOne({"_id": id});
		return res.status(202).send(editedPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error editing patient"});
	}
});

// Excluir paciente
router.get('/delete', (req, res) => {
		return res.status(400).send({message:"To delete a patient, use the post method passing a JSON with id"});
});
router.post('/delete', async (req, res) => {
	const {id} = req.body;
	
	if (!id) return res.status(400).send({error: "The required field id is not filled"});
	
	try {
		var deletedPatient = await Patient.findOne({"_id": id});
		if(!deletedPatient) return res.status(400).send({error: "This patient id does not exist"});
		await Patient.deleteOne({"_id": id});
		return res.status(202).send(deletedPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error excluding patient"});
	}
});

module.exports = router;
