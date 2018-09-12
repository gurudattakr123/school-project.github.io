
const express = require('express');
const router = express.Router();
const passport = require('passport');
const user=require('../models/user');




router.get('/', function(req, res){
  res.render('login');
});



router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      return res.render("production/main",{danger:"Either Username or Password is not correct!",success:'',signmsg:'',logoutmsg:''});
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      if(user.Role=="fieldExe_role"){
      return res.redirect('/Rajaratha/registeredowner');
      }
      return res.redirect('/Rajaratha/Dashboard');
    });
  })(req, res, next);
});


router.get('/signout',  function(req, res){
  res.render('production/main',{danger:'',success:'',signmsg:'',logoutmsg:'Logged out successfully.'});
});

router.get('/logout', isValidUser, function(req, res){
  req.logout();
  res.redirect('/Rajaratha/signout');
  });

  function isValidUser(req,res,next){
    if(req.isAuthenticated()){
    next();
    }
    else{
        res.redirect('/Rajaratha/login');
  }
  }

module.exports = router;




