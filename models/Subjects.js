var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var subjectSchema = new Schema({
        _id: Schema.Types.ObjectId,
        class_id : String, 
        subjects : Array,
},
{ versionKey: false }
);


module.exports=mongoose.model('subject', subjectSchema, 'subject');