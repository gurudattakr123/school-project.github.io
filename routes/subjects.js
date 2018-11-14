const express = require('express');
const router = express.Router();
const classes = require('../models/Classes');
const subject = require('../models/subjects');


router.get('/list', isValidUser, function(req, res, next){
    classes.find({}, {class_name:1, class_id:1}, function(err, cls_names){
        res.render('subjects-list',{classes: cls_names});
    })
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-subject');
})

router.post('/update_subjects', function(req, res, next){
   class_id = req.body.class;
   sub_array = req.body.subjects;
    subject.findOne({'class_id':class_id}, function(err, result){
        if (err) throw err;
        if(result == null){
        new subject({'class_id':class_id, 'subjects':{$push:sub_array}}).save(function(err){
            if(err) throw err;
            else{
                console.log('success');
                res.redirect('/subjects/list')
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
