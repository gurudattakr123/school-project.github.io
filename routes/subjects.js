const express = require('express');
const router = express.Router();
var mongoose = require('mongoose')
var ObjectId = require('mongodb').ObjectId;
counter = require('../models/Counter');
const classes = require('../models/Classes');
const subject = require('../models/Subjects');

router.get('/list', isValidUser, function (req, res, next) {
    classes.find({}, { 'class_name': 1, 'class_id': 1, 'subject_names':1, _id:0 }, function (err1, cls_detail) {
        if(err1) console.log(err1);
        console.log(cls_detail.subject_names)
        res.render('subjects-list', { classes: cls_detail});
    })
})

router.get('/add', isValidUser,  function (req, res, next) {
    res.render('add-subject');
})


router.post('/update_subjects', function (req, res, next) {
    var class_id = req.body.class;
    var sub = [];
    sub = req.body.subjects;
    console.log(req.body)
    classes.findOne({ 'class_id': class_id }, function (err, result) {
        if (err) throw err;
        console.log(result.subject_names)
        if (result.subject_names.length == 0) {
                classes.updateOne({ 'class_id': class_id }, { $push: { subject_names: sub } },{upsert:true}, async function (err, updated) {
                    if (updated.nModified == 1) {
                        console.log('updated message')
                        await sub.forEach(ele => {
                            subject.updateOne({'_id':ObjectId('5bf64c224dd39b1a00475658')}, { $addToSet: { 'subject_name': ele } },{upsert:true}, function(err, cb){
                                if(err) console.log(err);
                                console.log('updated subjects1'); //toastr message
                                
                            })
                        })
                        res.redirect('/subjects/list');  
                     }
                 })
            
        } else {
            console.log('already present in the database');
            sub.forEach(ele => {
                subject.updateOne({'_id':ObjectId('5bf64c224dd39b1a00475658')}, { $addToSet: { 'subject_name': ele } },{upsert:true}, function(err, cb){
                    if(err) console.log(err);
                })
            })
            console.log('updated subjects2'); //toastr message
            res.redirect('/subjects/list');  
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
