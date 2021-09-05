const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Função autenticação
const auth = (req, res, next) => {
return next(); // Esta linha desativa a autenticação temporariamente, para fins de desenvolvimento e testes
	const tokenHeader = req.headers.token;
	if(!tokenHeader) return res.status(403).send({"error":"To access this endpoint, send the user's token"});
	jwt.verify(tokenHeader, config.jwt_password, (err, decoded) =>
	{
		if(err) return res.status(403).send({"error":"This user token is not valid"});
		return next();
	});
};

module.exports = auth;
