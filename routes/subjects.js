const express = require('express');
const router = express.Router();
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

const classes = require('../models/Classes');
const subject = require('../models/Subjects');


router.get('/list', isValidUser, function(req, res, next){
    classes.find({}, {class_name:1, class_id:1}, function(err, cls_names){
        res.render('subjects-list',{classes: cls_names});
    })
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-subject');
})

router.post('/update_subjects', function(req, res, next){
   var class_id = req.body.class;
   var sub_array = req.body.subjects;
   console.log(sub_array)
    subject.findOne({'class_id':class_id}, function(err, result){
        if (err) throw err;
        if(result == null){
        new subject({'_id': new mongoose.Types.ObjectId, 'class_id':class_id}).save(function(err){
            if(err) console.log(err.message) 
            else{
                subject.updateOne({'class_id':class_id}, {$push:{subjects:sub_array}}, {new:true}, function(err, update){
                    if(err) console.log(err.message)
                    if(update.nModified == 1){
                        console.log('success');
                        res.redirect('/subjects/list')
                    }
                    else {
                        console.log('could not save subjects');
                        //delete the class_id stored already
                        res.redirect('/subjects/list')
                    }
            })
        }
    })
    } else {
        console.log('already present');
        res.redirect('/subjects/list');
    }
}) 
})

function isValidUser(req,res,next){
    if(req.isAuthenticated()){
    next();
    }
    else{
        res.redirect('/');
  }
  }

module.exports = router;
