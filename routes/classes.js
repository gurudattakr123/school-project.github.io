const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const student = require('../models/Students');
const Class = require('../models/Classes');


router.get('/list', isValidUser, function(req, res, next){
    Class.find(function(err, result){
        tchrArray = new Array();
        result.forEach(element => {
            teacher.find({'teacher_id':element.class_teacher}, function(err, tchr){
                tchrArray.push(tchr[0].first_name+' '+tchr[0].last_name)
            })    
        });
        console.log(tchrArray)
        res.render('class_list', {classes : result});
    })
});

router.get('/add', isValidUser, function(req, res, next){
    teacher.find({},{'_id':0, 'first_name':1, 'last_name':1, 'teacher_id':1},function(err, result){ 
         if(err) throw err;
    res.render('add-class', {tchr_details : result});
     });
});

router.get('/:class_id', isValidUser, function(req, res){
    student.find({'class_id': req.params.class_id}, function(err, students){
        res.render('list_of_students',{students:students})
    })
})


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

/*
router.get('/sections/add.class=:class_id', isValidUser, function(req, res, next){
    teacher.find({},{'_id':0, 'first_name':1, 'last_name':1, 'teacher_id':1},function(err, result){ 
        if(err) throw err;
        res.render('add-section', {url:req.originalUrl, tchr_details:result });
    });
});
*/

/*
router.post('/sections/add.class=:class_id', function(req, res){
    var url = req.originalUrl;
    class_id = req.params.class_id;
    section_name = req.body.section_name;
    class_teacher_id = req.body.teacher_id;
    
    section.findOne({$and:[{'class_id':class_id}, {'section_name' : section_name}]}, function(err, result){
            if(err) throw err;
            if(result != null){
                console.log('already registered message to be displayed'); // already registered message to be displayed
                res.redirect(url);
            }else{
                new section({
                    'class_id' : class_id,
                    'section_id': class_id+'_sec_'+section_name,
                    'section_name' : section_name,
                    'class_teacher' : class_teacher_id
                }).save(function(err){
                    if(err) throw err;
                })
                console.log('success');//send toastr success
                res.redirect('/classes/list');
            }
        if(err) throw err;

    })
})*/

function isValidUser(req,res,next){
    if(req.isAuthenticated()){
    next();
    }
    else{
        res.redirect('/');
  }
  }

module.exports = router;
