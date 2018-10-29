const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const student = require('../models/Students');
const Class = require('../models/Classes');
const exam = require('../models/Exams');

router.get('/list', isValidUser, function(req, res){
    res.render('exam_list');
});


router.post('/add', isValidUser, function(req, res, next){
    exam.find({},{'_id':0, 'exam_type':1},function(err, result){ 
         if(err) throw err;
    res.render('add-exam', {exam_type:result});
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


function isValidUser(req,res,next){
    if(req.isAuthenticated()){
    next();
    }
    else{
        res.redirect('/');
  }
  }

module.exports = router;
