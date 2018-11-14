var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var subjectSchema = new Schema({
  
        class_id : String, 
        subject_names : Array,
    
},
{ versionKey: false }

);

module.exports=mongoose.model('subject', subjectSchema, 'subject');