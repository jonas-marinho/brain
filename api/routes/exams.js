const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
		return res.send({message: "API de exames do brAIn funcionando"});
});

module.exports = router;
