'use strict';
var express    = require('express'),
    mongoose   = require('mongoose'),
    bodyParser = require('body-parser'),
    logger     = require('morgan'),
    
    seedDB      = require('./seedDB'),
    
    teamRouter  = require('./routes/teamRouter'),
    studentRouter  = require('./routes/studentRouter'),
    attendanceRouter  = require('./routes/attendanceRouter'),
    reportRouter  = require('./routes/reportRouter'),
    
    port       = process.env.PORT,
    ip         = process.env.IP,
    app        = express();

mongoose.Promise = require('bluebird');



// APP CONFIG
var url = process.env.DBURL || "mongodb://localhost/capstone";
mongoose.connect(url);
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/www'));


// PASSPORT CONFIG



// ROUTES
app.use('/teams', teamRouter);
app.use('/students', studentRouter);
//app.use('/lessons', lessonRouter);
app.use('/attendances', attendanceRouter);
app.use('/reports', reportRouter);


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
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});


app.listen(port, ip, function() {
    console.log('CAPSTONE SERVER IS UP!!!!');
});