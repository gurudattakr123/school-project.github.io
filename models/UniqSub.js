var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var uniqSubSchema = new Schema({
        subject_name : [String],
        
},
{ versionKey: false }
);

module.exports=mongoose.model('UniqSub', uniqSubSchema, 'UniqSub');