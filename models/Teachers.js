const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var TeacherattendanceSchema = new Schema({
    date:Date,
    status: String
});

var TeacherSchema = new Schema({
    teacher_id : String,
    first_name : String,
    last_name : String,
    gender : String,
    dob : String,
    age : Number,
    email : String,
    phone_num : Number,
    address : String,
    profile_pic : String,
    class_id : String,
    doj : String, 
    subjects : Array,
    attendance : [TeacherattendanceSchema],
    username: String,
    password : String
});





TeacherSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
  }
  
  TeacherSchema.methods.isValid = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
{ versionKey: false }


module.exports = mongoose.model('teacher', TeacherSchema, 'teacher');

