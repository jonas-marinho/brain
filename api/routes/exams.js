const express = require('express');
const router = express.Router();

// Mensagem padrão desta rota
router.get('/', (req, res) => {
		return res.send({message: "brAIn's exams API is working correctly!"});
});

// Gravação de dados do exame
router.get('/write', (req, res) => {
		return res.status(400).send({message:"To save data using this API endpoint, use POST method, passing userID, userToken, patientID, examTimestamp and data (as an unitary JSON) as parameters."});
});
router.post('/write', (req, res) => {
		return res.status(501).send("Verificar o userID e user Token; Encontrar o examID a partir do patientID e examTimestamp (criar um examID se não houver ainda); Verificar se o formato dos dados está correto; Salvar os dados do exame; Retornar o examID junto com a resposta 'success' ou 'fail'");
});

// Análise do exame
router.get('/analysis', (req, res) => {
		return res.status(400).send({message:"To get data from this API endpoint, use POST method, passing userID, userToken, patientID and examID as parameters."});
});
router.post('/analysis', (req, res) => {
		return res.status(501).send("Verificar se os parâmetros recebidos estão corretos; Realizar a análise dos dados com o nosso modelo; Retornar a resposta com a probabilidade de ser um quadro de aneurisma");
});

// Label do exame
router.get('/label', (req, res) => {
		return res.status(400).send({message:"To get data from this API endpoint, use POST method, passing userID, userToken, patientID, examID and label as parameters."});
});
router.post('/label', (req, res) => {
		return res.status(501).send("Verificar se os parâmetros recebidos estão corretos; Atualizar o label do exame; Responder se foi atualizado corretamente");
});

module.exports = router;
