const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers')
const multer = require('multer');
const counter = require('../models/Counter');
const Subjects = require('../models/Subjects');


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
    Subjects.findOne({}, {'subject_name':1}, function(err, allSubs){
        res.render('add-teacher', {subjects:allSubs.subject_name});
    });
});

router.get('/attendance', isValidUser, function(req, res, next){
    teacher.find(function(err, result){
    res.render('teacher_attendance_list',{teachers:result});
});
})

router.post('/attendance', function(req, res){
    array=[];
    array=req.body;
    delete array.myTable_length;
    let today = new Date().toLocaleDateString()
    for(var k in array){
        let att = { date: today, status: array[k]}
        teacher.updateOne({'teacher_id':k}, {$push:{attendance:att}}, {new:true})
        .then(() => console.log("Success"))
        .catch(err => console.log(err));
    }
    console.log('updated message to be displayed'); //update message to be displayed using toastr
    res.redirect('/teachers/list');
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
            count = result.teacher_id;
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

function isValidUser (req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    }
    req.session.returnTo = req.originalUrl; 
    res.redirect('/');
  }
  

module.exports = router;
