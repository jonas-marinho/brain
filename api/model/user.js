const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true, select: false},
	userID: {type: String, required: true, unique: true},
	userToken: {type: String, required: true, select: false},
	name: {type: String, default: 'User'},
	created: {type: Date, default: Date.now}
});

UserSchema.pre('save', function(next){
	let user = this;
	if(!user.isModified('password') || !user.isModified('userToken')) return next();
	
	bcrypt.hash(user.password, 10, (err, encrypted) => {
		user.password = encrypted;
	});
	
	bcrypt.hash(user.userToken, 10, (err, encrypted) => {
		user.userToken = encrypted;
	});
	
	return next();
});

module.exports = mongoose.model('User', UserSchema);
