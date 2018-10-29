const express = require('express');
const router = express.Router();
const teacher = require('../models/Teachers');
const student = require('../models/Students');
const Class = require('../models/Classes');

router.get('/list', isValidUser, function(req, res){
    res.render('exam_list');
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
