var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ClassSchema=new Schema({

        class_id : String,
        class_name : String,
        class_number : Number,
 
        subject_id : String,
        subject_names : Array,
        
        class_teacher : String 
    
},
{ versionKey: false }

);

module.exports=mongoose.model('Class', ClassSchema, 'Class');