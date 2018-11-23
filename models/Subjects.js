var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var subjectSchema = new Schema({
        subject_name : [String],
        
},
{ versionKey: false }
);


module.exports=mongoose.model('subject', subjectSchema, 'subject');