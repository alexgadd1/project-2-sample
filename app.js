pry = require('pryjs');

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var db = require('./db');
//// CORRECT LISTENING PORT SYNTAX BELOW, ALSO ON BOTTOM OF PAGE?(line 65)////
var port = 3000;

mongoose.connect('mongodb://localhost/project-2');

var index = require('./routes/index');
var users = require('./routes/users');
var authors = require('./routes/authors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: "derpderpderpcats",
  resave: false,
  saveUninitialized: false
}));

app.use('/', index);
app.use('/users', users);
app.use('/authors', authors);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
  console.log('Listening on page');
});

///OR - FOUND ON SERVER.JS PAGE IN PREVIOUS LAB///

app.listen(3000, function()///(req, res)/// {
  console.log('hey')
});

module.exports = app;
