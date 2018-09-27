const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    teacher_id : String,
    firstName : String,
    lastName : String,
    gender : String,
    dob : String,
    blood_group : String,
    email : String,
    phone_num : Number,
    address : String,
    profile_pic : String,
    
    class_id : String,
    doj : String, 
    subject_id : String
});
{ versionKey: false }



module.exports = mongoose.model('teacher', TeacherSchema, 'teacher');
