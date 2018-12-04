const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const student = require('../models/Students');
const Class = require('../models/Classes');
const section = require('../models/Sections')

router.get('/list', isValidUser, function(req, res, next){
    Class.find(function(err, result){
        var tchrArray = [];
        result.forEach(element => {
            teacher.findOne({'teacher_id':element.class_teacher},{'first_name':1, 'last_name':1, '_id':0}, function(err, tchr){
                console.log(tchr)
                tchrArray.push(tchr)  // incomplete
                
            })    
        });
        
        res.render('class_list', {classes : result, teachers:tchrArray});
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
        Class.find({'class_id':req.params.class_id},{'_id':0}, function(err, cls_result){
        res.render('classwise_list_of_students',{students:students, class_details:cls_result})
    })
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


router.get('/sections/add.for=:class_id', isValidUser, function(req, res, next){
    teacher.find({},{'_id':0, 'first_name':1, 'last_name':1, 'teacher_id':1},function(err, result){ 
        if(err) throw err;
        res.render('add-section', {url:req.originalUrl, tchr_details:result });
    });
});



router.post('/sections/add.for=:class_id', function(req, res){
    console.log(req.body)
    var url = req.originalUrl;
    class_id = req.params.class_id;
    section_name = req.body.section_name;
    class_teacher_id = req.body.class_teacher;
    var section_id = class_id+section_name;
    console.log(class_teacher_id, req.params.class_id, section_id)
    section.findOne({$and:[{'section_name': section_name, 'section_id' : section_id}]}, function(err, result){
        if(err) throw err;
        if(result != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }else{
            
            new section({
                'class_id' : class_id,
                'section_id' : section_id,
                'section_name' : section_name,
                'class_teacher' : class_teacher_id
            }).save(function(err){
                if(err) throw err;
                Class.updateOne({ 'class_id': class_id }, { $push: { sections: section_name } },{upsert:true}, function (err, updated) {
                    if (updated.nModified == 1) {
                        console.log('added section_name inside class collection')
                    }
                    else{
                        console.log('could not add section_name inside class collection')
                    }
                })
            })
            console.log('success');//send toastr success
            res.redirect('/classes/'+class_id);
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
