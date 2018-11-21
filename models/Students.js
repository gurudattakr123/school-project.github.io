const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema({ 
    date: Date,
    subject: String, 
    status: String,
    _id:false
  });


const StudentSchema = new Schema({
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
    documents : String,
//attendance
    attendance:[AttendanceSchema]
});



{ versionKey: false }



module.exports = mongoose.model('student', StudentSchema, 'student');
