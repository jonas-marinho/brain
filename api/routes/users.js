const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const config = require('../config/config');

// Lista de usuários
router.get('/', auth, async (req, res) => {
	try {
		const users = await User.find({});
		return res.send(users);
	}
	catch (err) {
		return res.status(500).send({error:"Error on users consult"});
	}
});

// Autenticação
router.get('/auth', (req, res) => {
		return res.status(400).send({message:"To get data from this API endpoint, use POST method, passing email and password as parameters."});
});
router.post('/auth', async (req, res) => {
	const {email, password} = req.body;
	if (!email || !password) return res.status(400).send({ error: 'Send an email and a password' });
	
	try {
		const user = await User.findOne({"email":email}).select('+password');
		if (!user) return res.status(401).send({ error: 'This email is not registered' });
		
		const rightPassword = await bcrypt.compare(password, user.password);
		
		if(!rightPassword) return res.status(401).send({ error: 'The password is wrong' });
		
		authUser = {};
		Object.keys(user['_doc']).forEach((item, index, arr) => {
			if(item != 'password') authUser[item] = user['_doc'][item];
		});
		authUser['token'] = jwt.sign({id:user.id}, config.jwt_password, {expiresIn:'1d'});
		return res.status(202).send(authUser);		
    }
	catch (err) {
		return res.status(500).send({ error: 'Error finding user' });
	}
});

// Criar novo usuário
router.get('/create', (req, res) => {
		return res.status(400).send({message:"To create a new user, use the post method passing a JSON with email, password and name"});
});
router.post('/create', auth, async (req, res) => {
	const {email, password, name} = req.body;
	
	if (!email || !password || !name) return res.status(400).send({error: "There are required fields that are not filled"});
	
	try {
		user = await User.findOne({"email":email});
		if(user) return res.status(400).send({error: "The user already exists"});
		
		createdUser = await User.create({"email": email, "password": password, "name":name});
		createdUser.password = undefined;
		return res.status(201).send(createdUser);
	}
	catch (err) {
		return res.status(500).send({error: "Error searching for user"});
	}
});

module.exports = router;