const express = require('express');
const router = express.Router();

// Mensagem padrão desta rota
router.get('/', (req, res) => {
		return res.send({message: "brAIn's general API is working correctly!"});
});

module.exports = router;
