const express = require('express');
const router = express.Router();

// Mensagem padrao desta rota
router.get('/', (req, res) => {
		return res.send({message: "brAIn's users API is working correctly!"});
});

// Autentica�ao
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing mail and password as parameters."});
});
router.post('/auth', (req, res) => {
		return res.send("Retornar se o usu�rio recebeu permissao para logar ou nao");
});

module.exports = router;
