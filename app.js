const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
var flash = require('connect-flash');
require('./config/passport');
const MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var toastr = require('express-toastr');

/* import routes*/
let user = require('./routes/index')
let teachers = require('./routes/teachers');
let students = require('./routes/students');
let others = require('./routes/others');
let classes = require('./routes/classes');
let subjects = require('./routes/subjects');




mongoose.connect('mongodb+srv://user:pass@schoolproject-jmyey.gcp.mongodb.net/School', { user: 'guru', pass: 'guru', useNewUrlParser: true }).then(function () {
  console.log("connected");
}).catch(function (err) {
  console.log("not connected " + err);
});




/* Initialize Application */
const app = express();

/* public folder */
app.use(express.static(path.join(__dirname, '/public')));

/* view engine */
app.use('/subjects',express.static(path.join(__dirname, '/views')));
app.use('/classes/sections',express.static(path.join(__dirname, '/views')));
app.use('/classes',express.static(path.join(__dirname, '/views')));
app.use('/others',express.static(path.join(__dirname, '/views')));
app.use('/students',express.static(path.join(__dirname, '/views')));
app.use('/teachers',express.static(path.join(__dirname, '/views')));
app.use(express.static(path.join(__dirname, '/views')));
app.set('view engine', 'ejs');


/* Body Parser Middleware */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* passport initialization */

app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'secret',
  /*   cookie:{
     maxAge:36000000,
     key : 'express.sid',
     httpOnly:false,
     secure:false
   }, */
  /*store: new MongoStore({ mongooseConnection: mongoose.connection }) */
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(toastr());

// Global Vars
app.use(function (req, res, next) {
  /*res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  res.locals.info = req.flash('info');*/
  res.locals.toasts = req.toastr.render();
  res.locals.user = req.user || null;
  next();
});


/* using routed files */
app.use('/', user);
app.use('/teachers', teachers);
app.use('/students', students);
app.use('/others', others);
app.use('/classes', classes);
app.use('/subjects', subjects);




/* starting server */
app.listen(5000, function () {
  console.log('Server started on port 5000...');
});
