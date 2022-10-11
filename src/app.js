/* global.__basedir = __dirname; */
require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const localsUserCheck = require('./middlewares/localsUserCheck');


const cookieCheck = require('./middlewares/cookieCheck');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productCartRouter = require('./routes/productCart');
const productsRouter = require('./routes/products');
const adminRouter = require('./routes/admin');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride('_method'));
app.use(session({ secret: 'this is secret', resave: false, saveUninitialized: true }));

app.use(cookieCheck);

app.use(localsUserCheck);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productCart', productCartRouter);
app.use('/products', productsRouter);
app.use('/admin',adminRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
