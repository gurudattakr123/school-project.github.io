var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const schedule = new Schema({
    _id:false,
    class_id: String,
    subject_id: String,
    date: Date,
    start_time: String,
    duration: String,
    end_time: String,
    syllabus: String
},
{ versionKey: false }
);

const ExamSchema=new Schema({
    exam_type: String,
    exam_id: String,
    schedules:[schedule],
    _id: false
},
{ versionKey: false }

);

module.exports=mongoose.model('Exam', ExamSchema, 'Exam');