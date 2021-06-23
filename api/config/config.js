const dev = false;
var env = process.env.NODE_ENV || dev;
env = 'dev';

const config = () => {
	switch (env) {
		case 'dev':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority'
		}
		case 'hml':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority'			
		}
		case 'prod':
		return {
			bd_string: 'mongodb+srv://jonas:RL2rwkIJCTu3NPGs@brain-mongodb.vyjft.mongodb.net/brain?retryWrites=true&w=majority'
		}
	}
}

console.log("Iniciando a API em ambiente ${env.toUpperCase()}");
console.log(config.bd_string);

module.exports = config;