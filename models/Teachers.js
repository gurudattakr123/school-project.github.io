const mongoose = require('mongoose');

const TeacherSchema = mongoose.Schema({
    teacher_id : String,
    firstName : String,
    lastName : String,
    gender : String,
    dob : String,
    age : Number,
    email : String,
    phone_num : Number,
    address : String,
    profile_pic : String,
    class_id : String,
    doj : String, 
    subject_id : String,
    password : String
});
{ versionKey: false }



module.exports = mongoose.model('teacher', TeacherSchema, 'teacher');
