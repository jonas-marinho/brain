const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
		return res.send({message: "API de usuários do brAIn funcionando"});
});

module.exports = router;
