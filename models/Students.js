const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    student_id : String,
    first_name : String,
    last_name : String,
    age : Number,
    gender : String,
    dob : Date,
    blood_group : String,
    profile_pic : String,
    roll_number : String,
    extras : String, 
    class_id: String,
    class_number : String,
    section_name : String,
//parents
    mother_name : String,
    father_name : String,
    phone_num1 : Number,
    phone_num2 : Number,
    email : String,
    address : String,
//admission details
    admission_no : String,
    admission_date: Date,
    payment_status: String,
    documents : String
});



{ versionKey: false }



module.exports = mongoose.model('student', StudentSchema, 'student');
