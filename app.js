var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compression = require('compression')
var helmet = require('helmet')

var attachment = require('./routes/attachment');
var create = require('./routes/create');
var del = require('./routes/delete');
var edit = require('./routes/edit');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var search = require('./routes/search');
var index = require('./routes/index');
var exp = require('./routes/export');
var pdf = require('./routes/pdf');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({ extended: false, limit: '100mb'}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', login);
app.use('/attachment', attachment);
app.use('/create', create);
app.use('/delete', del);
app.use('/edit', edit);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/search', search);
app.use('/index', index);
app.use('/pdf', pdf);
app.use('/export', exp);

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


app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

module.exports = app;
