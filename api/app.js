// Node Express
const express = require('express');
const app = express();
const port = 8000;

// MongoDB Atlas
const mongoose = require('mongoose');
const dbUrl = 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const dbOptions = {reconnectTries: Number.MAX_VALUE, reconnectInterval: 500, poolSize: 5, useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(dbUrl, dbOptions);
mongoose.set('useCreateIndex', true);

mongoose.connection.on('error', (err) => {
	console.log('Erro na conexão com o banco de dados: ' + err);
});
mongoose.connection.on('disconnected', () => {
	console.log('Aplicação desconectada do banco de dados');
});
mongoose.connection.on('connected', () => {
	console.log('Aplicação conectada ao banco de dados');
});

// Body Parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// routes
const indexRoute = require('./routes/index');
const usersRoute = require('./routes/users');
const patientsRoute = require('./routes/patients');
const examsRoute = require('./routes/exams');

app.use('/', indexRoute);
app.use('/users', usersRoute);
app.use('/patients', patientsRoute);
app.use('/exams', examsRoute);

app.listen(port);

module.exports = app;
