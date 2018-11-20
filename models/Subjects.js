var mongoose=require('mongoose');
var Schema=mongoose.Schema;



var subjectSchema = new Schema({
        _id: Schema.Types.ObjectId,
        class_id : String, 
        subjects : Array,
},
{ versionKey: false }
);

var unique_subjects = new Schema({
        subject_id : String,
        subject_name : String,
        _id:false
},
{ versionKey: false }
);

module.exports = mongoose.model('unique_subjects', unique_subjects, 'unique_subjects')

module.exports=mongoose.model('subject', subjectSchema, 'subject');