var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var CounterSchema=new Schema({
    student_id:Number,
    teacher_id:Number,
    class_id:Number,
    subject_id:Number
},
{versionKey: false }

);

module.exports=mongoose.model('counter',CounterSchema,'counter');