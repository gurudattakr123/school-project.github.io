const express = require('express');
const router = express.Router();

router.get('/list', isValidUser, function(req, res, next){
    res.render('teachers_list');
})

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-teacher');
})

router.get('/attendance', isValidUser, function(req, res, next){
    res.render('teacher-attendance');
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
