const express = require('express');
const router = express.Router();
const classes = require('../models/Classes')
router.get('/list', isValidUser, function(req, res, next){
    classes.find({}, {class_name:1, class_id:1}, function(err, cls_names){
        res.render('subjects-list',{classes: cls_names});
    })
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-subject');
})

router.post('/update_subjects', function(req, res, next){
    console.log(req.body)
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
