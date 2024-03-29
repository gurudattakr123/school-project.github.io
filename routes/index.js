const express = require('express');
const router = express.Router();
const passport = require('passport');
const User=require('../models/Users');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
const students = require('../models/Students');
const teacher = require('../models/Teachers')
const Class = require('../models/Classes')
/*login get*/
router.get('/', function(req, res){
  res.render('login',/*{toasts:req.toastr.error}*/);
});

router.get('/dashboard',  isValidUser, function(req, res, next){
  students.distinct('student_id').exec(function(err1, st_count){
    if(err1) throw err1;
    teacher.distinct('teacher_id').exec(function(err2, tchr_count){
      if(err2) throw err2;
      Class.distinct('class_id').exec(function(err3, cls_count){
        if(err3) throw err3;
    students.find({'payment_status':"pending"}, function(err4, student){
      if(err4) throw err4;
      res.render('dashboard', { students:student, num_of_st:st_count.length, num_of_tchr:tchr_count.length, num_of_cls:cls_count.length});
     })
    })
  })
})
});

/* login post */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) {
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) { 
        return next(err); 
      }
      res.redirect(req.session.returnTo || '/dashboard');
      delete req.session.returnTo;
    });
  })(req, res, next);
});

/* signup get */
router.get('/register', isValidUser, function(req, res){
  res.render('register');
});

var uniqueEmail = function (req, res, next) {
  User.findOne({ 'email': req.body.email }, function (error, result) {
    if (result == null) {
      next();
    } else {
      res.redirect('/register');
    }
  })
}
router.post('/register',uniqueEmail, function(req, res, next){
  User.findOne({ email: req.body.email }, function (err, user) {
    if(err) console.log(err)
    if (!user) {
      console.log(req.body)
    var newUser = new User();
    newUser.email = req.body.email;
    newUser.password = newUser.hashPassword(req.body.password);
    console.log(newUser.hashPassword(req.body.password))

    newUser.save(function (err) {
     if(err) throw err;
     res.redirect('/login')
    })
}
});
})
/* signup post 
router.post('/register',uniqueEmail, function (req, res) {
  crypto.randomBytes(5, function (err, buf) {
    var token = buf.toString('hex');

    smtpTransport = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'gurudattaapm@gmail.com',
        pass: '8095959883' 
      }
    });
    var mailOptions = {
      to: req.body.email,
      from: 'gurudattaapm@gmail.com',
      subject: 'Registration link from SchoolName',
      text:
        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
        'http://' + req.headers.host + '/registration/' + token + '\n\n' +
        'If you did not request, then please ignore this email.\n'
    };
    smtpTransport.sendMail(mailOptions, function (err) {
      if (err) {
        console.log('error')
        res.render('register')
        console.log(err);
      } else {
        console.log(req.body)
        new User({
          fullname: req.body.fullname,
          email: req.body.email,
          Role: req.body.Role,
          gender: req.body.gender,
          resetPasswordToken: token,
          resetPasswordExpires: Date.now() + 3600000 // 1 hour
        }).save(function (err) {
          if (err) throw err;
        });
        res.render('login', { success: 'Activation Link is sent to ' + req.body.email + '.', danger: '' })
      }
    });
  });
});
*/
/* registration using link (post) */


/* forgot password */
router.post('/forgotPassword', function (req, res, next) {
  async.waterfall([
    function (done) {
      crypto.randomBytes(20, function (err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function (token, done) {
      User.findOne({ email: req.body.email }, function (err, user) {
        if (err) throw err;
        if (user === null) {
          return res.render('production/main', { success: '', danger: 'No account with that email address exists.', logoutmsg: '' });
        }

        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        user.save(function (err) {
          done(err, token, user);
        });
      });
    },
    function (token, user, done) {
      smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'rajarathaev@gmail.com',
          pass: 'ivds@123' //confirm password of msky gmail and enter here
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'rajarathaev@gmail.com',
        subject: 'Password Reset link from Rajaratha',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/resetPassword/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function (err) {
        done(err, 'done');
      });
    }
  ], function (err) {
    if (err) return next(err);
    console.log('err');
    res.render('production/main', { success: 'An e-mail has been sent to ' + user.email + ' with further instructions.', danger: '', logoutmsg: '' });
  });
});


router.get('/logout', async (req, res) => {
  await req.logout();
  await req.session.destroy();
  res.redirect('/');
  });

function isValidUser (req, res, next) {
  if (req.isAuthenticated()) { 
      return next();
  }
  req.session.returnTo = req.originalUrl; 
  res.redirect('/');
}

module.exports = router;




