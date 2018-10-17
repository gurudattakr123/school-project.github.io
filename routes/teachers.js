const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers')
const multer = require('multer');
const counter = require('../models/Counter');


var upload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) 
    { callback(null, './images/uploads');},
    filename: function (req, file, callback) 
    { callback(null, file.fieldname +'-' + Date.now()+".jpg");
  },
})
})

router.get('/list', isValidUser, function(req, res, next){

 teacher.find(function(err, result){
        res.render('teachers_list', {teachers:result});
    });
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-teacher');
})

router.get('/attendance', isValidUser, function(req, res, next){
    teacher.find(function(err, result){
    res.render('teacher_attendance_list',{teachers:result});
});
})

router.post('/teacher_attendance_update', function(req, res){
    array = [];
    for(var k in req.body){
        console.log(k.value);
    }
    console.log(array)
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
            counter.findOne({},{'teacher_id':1},function(err, result){
            if(err) throw err;
            console.log(result)
            count = result.teacher_id;
            console.log(count)
            teacher_id = "tchr_"+(count + 1);
            console.log(req.body);
            counter.updateOne({'teacher_id':count}, { $set: { "teacher_id" : (count+1) } }, function(err, result){
                if(err) throw err;
                if(result.nModified == 1){
                new teacher({
                    'teacher_id' : teacher_id,
                    'first_name' : req.body.first_name,
                    'last_name' : req.body.last_name,
                    'dob' : req.body.dob,
                    'age':req.body.age,
                    'gender' : req.body.gender,
                    'subjects' : req.body.subjects,
                    //'profile_pic' : "localhost:3000/uploads/"+req.file[0].filename,
                    'doj': req.body.doj,
                    'email' : req.body.email,
                    'phone_num' : req.body.phone_num,
                    'address' : req.body.address,
                    'username' : req.body.username,
                    'password' : req.body.password
                    //'class_id': to be done
                }).save(function(err){
                    if(err) throw err;
                    })
                        console.log('success');//send toastr success
                        res.redirect('/teachers/list') 
                    }else{
                        console.log('Failed to update counter')
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
