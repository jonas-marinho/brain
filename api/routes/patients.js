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
		return res.status(400).send({message:"To create a new patient, use the post method passing a JSON with name, birthDate (YYYY-MM-DD), diseases (array of strings) and info (string)"});
});
router.post('/create', async (req, res) => {
	const {name, birthDate, diseases, info} = req.body;
	
	if (!name || !birthDate) return res.status(400).send({error: "There are required fields (name and birthDate) that are not filled"});
	
	try {		
		createdPatient = await Patient.create({name: name, birthDate: birthDate, diseases: diseases.toText(), info: info});
		return res.status(201).send(createdPatient);
	}
	catch (err) {
		return res.status(500).send({error: "Error creating patient"});
	}
});


// Editar paciente

module.exports = router;
