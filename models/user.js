const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// User Schema
const UserSchema = mongoose.Schema({
	id: String,
	username: String,
	password: String,
	email: String,
	firstName: String,
	lastName: String,
	password: String,
	dob: String,
	address: String,
	phone_num: String,
	profile_pic: String,
	resetPasswordToken: String,
	resetPasswordExpires: Date
});
{ versionKey: false }


UserSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
}

UserSchema.methods.isValid = function (password) {
  return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model('User', UserSchema, 'User');
