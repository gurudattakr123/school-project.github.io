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
    attendance : [{refs: 'Teacherattendance'}],
    username: String,
    password : String
});


const Teacherattendance = mongoose.Schema({
    teacher_id : {refs: 'TeacherSchema' },
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


module.exports = mongoose.model('Teacherattendance', Teacherattendance, 'Teacherattendance')
module.exports = mongoose.model('teacher', TeacherSchema, 'teacher');
