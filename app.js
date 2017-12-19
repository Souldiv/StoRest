var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Session = require('express-session');

var users = require('./routes/users');
var home = require('./routes/home');
var image = require('./routes/image');
var Login = require('./routes/loginRoute');
var passportSetup = require('./config/passport-setup');
var mongoose = require('mongoose');
var passport = require('passport');

mongoose.connect('mongodb://souldiv:amrut@ds133876.mlab.com:33876/node', { useMongoClient: true});
var db = mongoose.connection;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(Session({
    secret: 'something',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
    if(req.user)
        res.locals.UserID = req.user.id;
    res.locals.FlashMessage = req.session.FlashMessage;
    delete req.session.FlashMessage;
    next();
});

app.use('/', home);
app.use('/store', users);
app.use('/home', home);
app.use('/Image', image);
app.use('/auth', Login);

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

module.exports = app;
