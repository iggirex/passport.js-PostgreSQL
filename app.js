var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('./passport') //import passport file
var session = require('express-session');// must import session module
// must also get passport-local module as well as passport

var flash = require('connect-flash'); // this is for flash messages with passport

var routes = require('./routes/index');
var users = require('./routes/users');
var signup = require('./routes/signup') //new route must be required
var dashboard = require('./routes/dashboard')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// session/cookie secret
app.use(session({
  secret: 'keyboard cat',
  saveUninitialized: true,
  resave: false
}));

app.use(passport.initialize()); // this starts passport
app.use(passport.session()); // this starts serialize/deserialize
app.use(flash()); // must initialize flash to use with passport

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

app.use('/signup', signup); // signup route will handle logging in, take us to signup.js route

app.use(function(req, res, next){
  if(req.user){
    next();
  } else {
    res.redirect('/signup')
  }
})
app.use('/dashboard', dashboard); //initialize dashboard route


app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
