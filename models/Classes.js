var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var sectionSchema = new Schema({
        section_id : String,
        section_name: String,
        class_teacher: String
})



var ClassSchema=new Schema({

        class_id : String,
        class_name : String,
        class_number : Number,
        sections: [sectionSchema],

        subject_id : String,
        subject_names : Array,
        
        class_teacher : String 
    
},
{ versionKey: false }

);

module.exports=mongoose.model('Class', ClassSchema, 'Class');