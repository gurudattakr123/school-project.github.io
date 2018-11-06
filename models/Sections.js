var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var sectionSchema=new Schema({
  
        class_id : String, 
        section_id : String,
        section_name : String,
        class_teacher : String 
    
},
{ versionKey: false }

);

module.exports=mongoose.model('section', sectionSchema, 'section');