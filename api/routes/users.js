const express = require('express');
const router = express.Router();
const Users = require('../model/user');

// Lista de usu�rios 
router.get('/', (req, res) => {
	Users.find({}, (err, data) => {
		if(err) return res.send({error:"Error on users consult"});
		return res.send(data);
	});
});

// Autentica��o
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing mail and password as parameters."});
});
router.post('/auth', (req, res) => {
		const {mail, password} = req.body;
		
		return res.send({message:"Retornar se o usu�rio recebeu permissao para logar ou n�o", "mail":mail, "password":password});
});

// Create
router.post('/create', (req, res) => {
	Users.create({email: "a", password: "a", userID: "a", userToken: "a"});
	return res.send({message: "usu�rio criado"});
});

module.exports = router;
