var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ClassSchema=new Schema({

    class : {
        class_id : String,
        class_name : String,
        class_number : String,
        teacher_id : String, 
        section : { 
            section_name : String,
            teacher_id : String 
        },
        subjects : {
            subject_id : String,
            name : String
        },
    },
},
{ versionKey: false }

);

module.exports=mongoose.model('Class',ClassSchema,'Class');