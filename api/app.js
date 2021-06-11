const express = require('express');
const app = express();
const port = 8000;

app.get('/', (req, res) => {
	return res.send({message: "brAIn funcionando com GET"});
});

app.listen(port);

module.exports = app;
