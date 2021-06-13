const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Lista de usu�rios 
router.get('/', (req, res) => {
	User.find({}, (err, data) => {
		if(err) return res.send({error:"Error on users consult"});
		return res.send(data);
	});
});

// Autentica��o
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing email and password as parameters."});
});
router.post('/auth', (req, res) => {
		const {email, password} = req.body;
		
		return res.send({message:"Retornar se o usu�rio recebeu permissao para logar ou n�o", "email":email, "password":password});
});

// Create
router.post('/create', (req, res) => {
	const {email, password} = req.body;
	
	User.create({email: email, password: password, userID: "a", userToken: "a"});
	return res.send({message: "The user has been created"});
});

module.exports = router;
