const express = require('express');
const router = express.Router();
const passport = require('passport');
const User=require('../models/user');
var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');


/*login get*/
router.get('/', function(req, res){
  res.render('login',{req:req});
});

router.get('/dashboard',isValidUser, function(req, res, next){
res.render('dashboard', {req:req});
});

/* login post */
router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) {
      req.toastr.error('Invalid credentials.');
      return res.redirect('/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      req.toastr.success('Welcome!')
      return res.redirect('/dashboard');
    });
  })(req, res, next);
});

/* signup get */
router.get('/register', function(req, res){
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

router.get('/logout', isValidUser, function(req, res){
  req.logout();
  res.redirect('/');
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




