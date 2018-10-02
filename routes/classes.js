const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const counter = require('../models/Counter');
const Class = require('../models/Classes');


router.get('/list', isValidUser, function(req, res, next){
    Class.find(function(err, result){
        console.log(result)
        res.render('class_list', {classes : result});
    })
});

router.get('/add', isValidUser, function(req, res, next){
    teacher.find({},{'_id':0, 'first_name':1, 'last_name':1, 'teacher_id':1},function(err, result){ 
         if(err) throw err;
    res.render('add-class', {tchr_details : result});
     });
});


router.get('/sections/list', isValidUser, function(req, res, next){
    res.render('section_list');
});

router.get('/sections/add.class=:class_id', isValidUser, function(req, res, next){
    Class.find({'class.class_id':req.params.class_id}, function(err, result){
        console.log(result)
    })
    res.render('add-section');
});


router.post('/add', function(req, res){
    var url = req.originalUrl;
    class_number = req.body.class_number;
    class_name = req.body.class_name;
    class_teacher = req.body.class_teacher;
    
    Class.findOne({$and:[{'class.class_name': class_name, 'class.class_number' : class_number}]}, function(err, result){
        if(err) throw err;
        if(result != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }else{
            new Class({
                'class.class_id' : "cls_"+class_number,
                'class.class_number' : class_number,
                'class.class_name' : class_name,
                'class.class_teacher' : class_teacher
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
