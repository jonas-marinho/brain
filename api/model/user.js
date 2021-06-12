const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true, select: false},
	userID: {type: String, required: true, unique: true},
	userToken: {type: String, required: true, select: false},
	name: {type: String, default: 'User'},
	created: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);
