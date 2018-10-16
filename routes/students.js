const express = require('express');
const router = express.Router();
const student = require('../models/Students');
const multer = require('multer');
const counter = require('../models/Counter');
const classes = require('../models/Classes')

var upload = multer({storage: multer.diskStorage({
    destination: function (req, file, callback) 
    { callback(null, './images/uploads');},
    filename: function (req, file, callback) 
    { callback(null, file.fieldname +'-' + Date.now()+".jpg");
  },
})
})

router.get('/list', isValidUser, function(req, res, next){
    student.find(function(err, result){
        res.render('students_list', {students:result});

    });
})

router.get('/add', isValidUser, function(req, res, next){
    classes.find({}, {class_name:1, class_id:1}, function(err, cls_names){
        res.render('add-student',{classes: cls_names});
    })
});


router.get('/attendance', isValidUser, function(req, res, next){
    classes.find({}, {class_name:1, class_id:1}, function(err, cls_names){
        student.distinct("section_name", function(err, sect_names){
    res.render('student-attendance', {classes : cls_names, sections : sect_names, /* subjects:subj_name */})
        })
    });
})

router.post('/attendance', function(req, res){
    class_id = req.body.class;
    section_name = req.body.section;
    subject_id = req.body.subject;
    student.find({'class_id':req.body.class, 'section_name':section_name}, function(err, students){
        console.log(students)
        res.render('student_attendance_list', { students : students })
    })
})


router.post('/add', upload.any(), function(req, res, next){
    var url = req.originalUrl;
    try{
     student.findOne({ $and: [ { 'first_name': req.body.first_name }, { 'last_name':req.body.last_name }, { 'dob': req.body.dob} ] }, function(err, stu){
         if (err) throw err;
         if(stu != null){
            console.log('already registered message to be displayed'); // already registered message to be displayed
            res.redirect(url);
        }
         else{
            counter.findOne({}, {'student_id':1}, function(err, result){
            if(err) throw err;
            count = result.student_id;
            student_id = "std_"+(count + 1);
            counter.updateOne({'student_id':count}, { $set: { "student_id" : (count+1) } }, function(err, result){
                if(err) throw err;
                if(result.nModified == 1){
                    classes.findOne({'class_id': req.body.class}, function(err, num){
                        class_number = num.class_number;
                    new student({
                        'student_id':student_id,
                        'first_name' : req.body.first_name,
                        'last_name' : req.body.last_name,
                        'age':req.body.age,
                        'gender' : req.body.gender,
                        'dob' : req.body.dob,
                        'blood_group' : req.body.blood_group,
                        'class_number' : class_number,
                        'class_id' : req.body.class,
                        'section_name' : req.body.section,
                        //'profile_pic' : "localhost:3000/uploads/"+req.file[0].filename,
                        'roll_number' : req.body.roll_no,
                        'admission_no': req.body.admission_no,
                        'admission_date': req.body.doj,
                        'father_name' : req.body.father_name,
                        'mother_name' : req.body.mother_name,
                        'phone_num1' : req.body.parent_phone1,
                        'phone_num2' : req.body.parent_phone2,
                        'email' : req.body.parents_email,
                        'address' : req.body.address,
                        'extras':req.body.extras
                    }).save(function(err){
                        if(err) throw err;
                    })
                    console.log('success');//send toastr success
                    res.redirect('/students/list')
                })
                }
                else{
                    console.log('Failed to update counter');
                    res.redirect(url)
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
