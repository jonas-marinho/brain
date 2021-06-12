const express = require('express');
const router = express.Router();
const Users = require('../model/user');

// Lista de usuários 
router.get('/', (req, res) => {
	Users.find({}, (err, data) => {
		if(err) return res.send({error:"Error on users consult"};);
		return res.send(data);
	});
});

// Autenticação
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing mail and password as parameters."});
});
router.post('/auth', (req, res) => {
		const {mail, password} = req.body;
		
		return res.send({message:"Retornar se o usuário recebeu permissao para logar ou não", "mail":mail, "password":password});
});

module.exports = router;
