const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
		return res.send({message: "API de usuários do brAIn funcionando"});
});

router.post('/auth', (req, res) => {
		return res.send("Retornar se o usuário recebeu permissao para logar ou nao");
});

module.exports = router;
