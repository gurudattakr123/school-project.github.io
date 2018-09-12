const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');
require('./config/passport');
const MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');

/* import routes*/
let user = require('./routes/index')


mongoose.connect('mongodb+srv://user:pass@rajaratha-xsrfp.mongodb.net/Rajaratha', { user: 'Msky', pass: 'msky@123', useNewUrlParser: true }).then(function () {
  console.log("connected");
}).catch(function (err) {
  console.log("not connected " + err);
});




/* Initialize Application */
const app = express();

/* public folder */
app.use(express.static(path.join(__dirname, '/public')));

/* view engine */
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

app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

/* using routed files */
app.use('/', user);

/* starting server */
app.listen(5000, function () {
  console.log('Server started on port 5000...');
});
