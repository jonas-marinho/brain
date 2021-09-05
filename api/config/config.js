var env = process.env.NODE_ENV || 'dev';

const config = () => {
	switch (env) {
		case 'dev':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority',
			jwt_password: 'brain'
		}
		case 'hml':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority',
			jwt_password: 'brain'
		}
		case 'prod':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority',
			jwt_password: 'brain'
		}
	}
}

console.log(`Iniciando a API em ambiente ${env.toUpperCase()}`);

module.exports = config();