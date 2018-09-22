const express = require('express');
const router = express.Router();

router.get('/list', isValidUser, function(req, res, next){
    console.log(req.originalUrl)
    res.render('class_list');
});

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-class');
});


router.get('/sections/list', isValidUser, function(req, res, next){
    res.render('section_list');
});

router.get('/sections/add', isValidUser, function(req, res, next){
    res.render('add-section');
});



function isValidUser(req,res,next){
    if(req.isAuthenticated()){
    next();
    }
    else{
        res.redirect('/');
  }
  }

module.exports = router;
