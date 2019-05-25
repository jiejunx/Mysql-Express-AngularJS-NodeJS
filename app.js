var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var report1Router = require('./routes/report1');
var report2Router = require('./routes/report2');
var report3Router = require('./routes/report3');
var report4Router = require('./routes/report4');
var report5Router = require('./routes/report5');
var report6Router = require('./routes/report6');
var report7Router = require('./routes/report7');
var actionHolRouter = require('./routes/action1');
var actionManRouter = require('./routes/action2');
var actionPopRouter = require('./routes/action3');
var statisticsRouter = require('./routes/statistics');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());2
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
  res.setHeader('Content-Type', 'application/json');
  next();
});

app.use('/r1', report1Router);
app.use('/stats', statisticsRouter);
app.use('/r2', report2Router);
app.use('/r3', report3Router);
app.use('/r4', report4Router);
app.use('/r5', report5Router);
app.use('/r6', report6Router);
app.use('/r7', report7Router);
app.use('/population', actionPopRouter);
app.use('/manager', actionManRouter);
app.use('/holiday', actionHolRouter);
//add a new route here. Define new router


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
