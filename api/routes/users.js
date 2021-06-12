const express = require('express');
const router = express.Router();

// Mensagem padrao desta rota
router.get('/', (req, res) => {
		return res.send({message: "brAIn's users API is working correctly!"});
});

// Autenticaçao
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing mail and password as parameters."});
});
router.post('/auth', (req, res) => {
		const mail = req.body.mail;
		const password = req.body.password;
		
		return res.send({message:"Retornar se o usuário recebeu permissao para logar ou não", "mail":mail, "password":password});
});

module.exports = router;
