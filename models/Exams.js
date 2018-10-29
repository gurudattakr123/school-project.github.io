var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ExamSchema=new Schema({
    exam_type: String,
     

},
{ versionKey: false }

);

module.exports=mongoose.model('Exam', ExamSchema, 'Exam');