const jwt = require('jsonwebtoken');

// Função autenticação
const auth = (req, res, next) => {
	const tokenHeader = req.headers.auth;
	if(!tokenHeader) return res.status(403).send({"error":"To access this endpoint, send the user's token"});
	jwt.verify(tokenHeader, 'brain', (err, decoded) =>
	{
		if(err) return res.status(403).send({"error":"This user token is not valid for this user"});
		return next();
	});
};

module.exports = auth;
