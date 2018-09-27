const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    student_id : String,
    firstName : String,
    lastName : String,
    gender : String,
    dob : Date,
    blood_group : String,
    email : String,
    phone_num : Number,
    address : String,
    profile_pic : String,

	class : {
        id : String,
        name : String,
        class_number : String,
        section : { 
            teacher_id : String 
        },
        subjects : {
            subject_id : String,
            name : String
        },
    },

    parents : {
        mother_name : String,
        father_name : String,
        phone_num1 : Number,
        phone_num2 : Number,
        email : String,
        address : String
    },

    admission : {
        admission_no : String,
        admission_date: Date,
        documents : String
    }
});

Roll_number : String

{ versionKey: false }



module.exports = mongoose.model('student', StudentSchema, 'student');
