const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');

// Lista de usuários 
router.get('/', async (req, res) => {
	try {
		const users = await User.find({});
		return res.send(users);
	}
	catch (err) {
		return res.send({error:"Error on users consult"});
	}
});

// Autenticação
router.get('/auth', (req, res) => {
		return res.send({message:"To get data from this API endpoint, use POST method, passing email and password as parameters."});
	}
});
router.post('/auth', async (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) return res.send({ error: 'Send an email and a password' });
	
	try {
		const user = await User.findOne({email}).select('+password');
		if (!user) return res.send({ error: 'This email is not registered' });
		
		const rightPassword = await bcrypt.compare(password, user.password);
		
		if(!rightPassword) return res.send({ error: 'The password is wrong' });
		
		user.password = undefined;
		return res.send(user);
		
    }
	catch (err) {
		return res.send({ error: 'Error finding user' });
	}
});

// Create
router.post('/create', async (req, res) => {
	const {email, password, name} = req.body;
	
	if (!email || !password || !name) return res.send({error: "There are fields that are not filled"});
	
	try {
		if(await User.findOne({email})) return res.send({error: "The user already exists"});
		
		createdUser = await User.create({email: email, password: password, name:name});
		createdUser.password = undefined;
		return res.send(createdUser);
	}
	catch (err) {
		return res.send({error: "Error searching for user"});
	}
});

module.exports = router;