const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const student = require('../models/Students');
const Class = require('../models/Classes');
const exam = require('../models/Exams');

router.get('/list',  function(req, res){
    exam.find({}, function(err, exam){
        res.render('exam_list',{exams:exam})
    })
});


router.post('/add', isValidUser, function(req, res, next){
    var url = req.originalUrl;
    exam.findOne({'exam_type':req.body.exam_name},{'_id':0, 'exam_type':1},function(err, result){ 
         if(err) throw err;
         if(result != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }else{
            new exam({
                'exam_type':req.body.exam_name,
                'exam_info':req.body.info
            }).save(function(err){
                if(err) throw err;
            })
            console.log('success');//send toastr success
            res.redirect('/exams/list');
        }
    })
})

router.get('/schedule', isValidUser, function(req, res){
    exam.find({},function(err, exam){
        Class.find({}, function(err, classes){
            res.render('schedule-exam',{examType:exam, classes:classes});
        })
        
    });
});


router.post('/add', function(req, res){
    var url = req.originalUrl;
    class_number = req.body.class_number;
    class_name = req.body.class_name;
    class_teacher = req.body.class_teacher;
    
    Class.findOne({$and:[{'class_name': class_name, 'class_number' : class_number}]}, function(err, result){
        if(err) throw err;
        if(result != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }else{
            new Class({
                'class_id' : "cls_"+class_number,
                'class_number' : class_number,
                'class_name' : class_name,
                'class_teacher' : class_teacher
            }).save(function(err){
                if(err) throw err;
            })
            console.log('success');//send toastr success
            res.redirect('/classes/list');
        }
    })
})


function isValidUser (req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    }
    req.session.returnTo = req.originalUrl; 
    res.redirect('/');
  }
  
module.exports = router;
