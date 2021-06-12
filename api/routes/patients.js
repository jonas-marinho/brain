const express = require('express');
const router = express.Router();

// Lista de pacientes
router.get('/', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing userID and userToken as parameters. These parameters can get from /users/auth endpoint."});
});
router.post('/', (req, res) => {
		return res.send("Retornar a lista de pacientes se o userID e o userToken forem validados");
});

module.exports = router;
