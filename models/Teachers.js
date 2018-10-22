const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
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
    attendance : [{$ref: 'T_attendance'}],
    username: String,
    password : String
});


const Teacherattendance = mongoose.Schema({
    teacher_id : {$ref: 'TeacherSchema' },
    date:Date,
    status: String
})

TeacherSchema.methods.hashPassword = function (password) {
    return bcrypt.hashSync(password, 10);
  }
  
  TeacherSchema.methods.isValid = function (password) {
    return bcrypt.compareSync(password, this.password);
  }
{ versionKey: false }


module.exports = mongoose.model('T_attendance', Teacherattendance, 'T_attendance')
module.exports = mongoose.model('teacher', TeacherSchema, 'teacher');
