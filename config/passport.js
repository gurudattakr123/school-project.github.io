var express=require('express');
var LocalStrategy= require('passport-local').Strategy;
var User=require('../models/user');
var passport=require('passport');
  passport.use(new LocalStrategy({usernameField: 'email'},
        function(username, password, done) {
        
          User.findOne({'email':username }, function (err, user) {
            
            if (err) { return done(err); }
            if (!user) {
            
               return done(null,false,{ message: 'Incorrect Email Address.' }); 
              }
           
            if (!user.isValid(password)) { 
              return done(null,false,{ message: 'Incorrect password.' }); 
            }  
            
            return done(null, user);
            
          });
      
      
        }));

 
   passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
         
        done(err, user);
        });
    });
