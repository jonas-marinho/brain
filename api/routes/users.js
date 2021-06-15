const express = require('express');
const router = express.Router();
const User = require('../model/user');

// Lista de usuários 
router.get('/', (req, res) => {
	User.find({}, (err, data) => {
		if(err) return res.send({error:"Error on users consult"});
		return res.send(data);
	});
});

// Autenticação
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing email and password as parameters."});
});
router.post('/auth', (req, res) => {
		const {email, password} = req.body;
		
		return res.send({message:"Retornar se o usuário recebeu permissao para logar ou não", "email":email, "password":password});
});

// Create
router.post('/create', (req, res) => {
	const {email, password, name} = req.body;
	
	if (!email || !password || !name) return res.send({error: "There are fields that are not filled"});
	
	User.findOne({email}, (err, data) => {
		if(err) return res.send({error: "Error searching for user"});
		if(data) return res.send({error: "The user already exists"});
		User.create({email: email, password: password, name:name, userID:0, userToken:""}, (err, data) => {
			if(err) return res.send({error: "Error to create user"});
			return res.send(data);
		});
	});
});

module.exports = router;
