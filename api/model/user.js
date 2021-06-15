const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
	email: {type: String, required: true, unique: true, lowercase: true},
	password: {type: String, required: true, select: false},
	userID: {type: String, unique: true},
	userToken: {type: String, required: true, select: false},
	name: {type: String, default: 'User'},
	created: {type: Date, default: Date.now}
});

// Encrypt password
UserSchema.pre('save', function(next){
	let user = this;
	if(!user.isModified('password')) return next();
	
	bcrypt.hash(user.password, 10, (err, encrypted) => {
		user.password = encrypted;
		return next();
	});
});

// Generate the internal userToken using the email as seed
UserSchema.pre('save', function(next){
	let user = this;
	if(!user.isModified('email')) return next();
	
	bcrypt.hash(user.email, 10, (err, encrypted) => {
		user.userToken = encrypted;
		return next();
	});
});

// Calculate the userID auto increment
UserSchema.pre('save', function (next) {
	let user = this;
	if(!(user.userID!=0)) return next();
	mongoose
		.model("userID", UserSchema)
		.countDocuments({ account: User.account }, function (err, counter) {
			if (err) return next(err);
			user.userID = counter + 1;
			next();
		});
});

module.exports = mongoose.model('User', UserSchema);
