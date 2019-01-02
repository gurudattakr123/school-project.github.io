const express = require('express');
const router = express.Router();

router.get('/list', isValidUser, function(req, res, next){
    res.render('others_list');
});

router.get('/add', isValidUser, function(req, res, next){
    res.render('add-others');
});

router.get('/attendance', isValidUser, function(req, res, next){
    res.render('others-attendance');
})

router.get('/settings', function(req, res){
res.render('settings')
})

function isValidUser (req, res, next) {
    if (req.isAuthenticated()) { 
        return next();
    }
    req.session.returnTo = req.originalUrl; 
    res.redirect('/');
  }
  

module.exports = router;
