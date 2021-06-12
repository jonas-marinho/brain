const express = require('express');
const app = express();
const port = 8000;

// body parser
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
