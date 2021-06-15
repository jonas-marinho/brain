const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Lista de usu�rios 
router.get('/', (req, res) => {
	User.find({}, (err, data) => {
		if(err) return res.send({error:"Error on users consult"});
		return res.send(data);
	});
});

// Autentica��o
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing email and password as parameters."});
});
router.post('/auth', (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) return res.send({ error: 'Send email and password' });

    Users.findOne({email}, (err, data) => {
        if (err) return res.send({ error: 'Error finding user' });
        if (!data) return res.send({ error: 'This email is not registered' });

        bcrypt.compare(password, data.password, (err, same) => {
            if (!same) return res.send({ error: 'The password is wrong' });

            data.password = undefined;
            return res.send(data);
        })
    }).select('+password');
});

// Create
router.post('/create', (req, res) => {
	const {email, password, name} = req.body;
	
	if (!email || !password || !name) return res.send({error: "There are fields that are not filled"});
	
	User.findOne({email}, (err, data) => {
		if(err) return res.send({error: "Error searching for user"});
		if(data) return res.send({error: "The user already exists"});
		User.create({email: email, password: password, name:name}, (err, data) => {
			if(err) return res.send({error: "Error to create user: " + err});
			return res.send(data);
		});
	});
});

module.exports = router;
