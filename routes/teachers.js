const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers')
const multer = require('multer');

var upload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) 
    { callback(null, './images/uploads');},
    filename: function (req, file, callback) 
    { callback(null, file.fieldname +'-' + Date.now()+".jpg");
  },
})
})

router.get('/list', isValidUser, function(req, res, next){
    res.render('teachers_list');
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-teacher');
})

router.get('/attendance', isValidUser, function(req, res, next){
    res.render('teacher-attendance');
})



router.post('/add', upload.any(), function(req, res, next){
    var url = req.originalUrl;
    try{
     teacher.findOne({ $and: [ { 'first_name': req.body.first_name }, { 'last_name':req.body.last_name }, { 'dob': req.body.dob} ] }, function(err, tchr){
         if (err) throw err;
         if(tchr != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }
         else{
            counter.findOne(function(err, result){
            if(err) throw err;
            count = result.teacher_id;
            teacher_id = "tchr_"+(count + 1);
            new teacher({
                'teacher_id':teacher_id,
                'first_name' : req.body.first_name,
                'last_name' : req.body.last_name,
                'dob' : req.body.dob,
                'age':req.body.age,
                'gender' : req.body.gender,
                //'profile_pic' : "localhost:3000/uploads/"+req.file[0].filename,
                'doj': req.body.doj,
                'email' : req.body.parents_email,
                'phone_num' : req.body.phone_num,
                'address' : req.body.address,
                //'class_id': to be done
             }).save(function(err){
                 if(err) throw err;
             })
            counter.updateOne({'student_id':count}, { $set: { "student_id" : student_id } }, function(err, result){
                if(err) throw err;
                if(result.nModified == 1){
                    console.log('success');//send toastr success
                    res.redirect('/students/list')
                }
                else{
                    console.log('something went wrong')
                }
            })
        });
             
}
     });
    
    }
    catch(err){
        console.log(err+' errors');
    }
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
