var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var methodOverride = require('method-override')
const session = require('express-session');
const flash = require('connect-flash');



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var inspectorRoute = require('./routes/inspectorRoute');
var reportRoute = require('./routes/repotRoute');
var roleRoute = require('./routes/roleRoute');
var adminRouter =require('./routes/adminRouter');
var userRoleRoute =require('./routes/userRoleRoute');
var engineerRoleRoute =require('./routes/engineerRoute');
var authApiRoute =require('./routes/authApiRoute');
const conn2 = require('./middlewares/conn2')
var cors = require('cors')

var app = express();

// try {
//  conn2.authenticate();
//   console.log('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}));
app.use(cors())
// app.options('*', cors());
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/sb-admi-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')));

app.use('/', indexRouter);
app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/inspector', inspectorRoute);
app.use('/report', reportRoute);
app.use('/role', roleRoute);
app.use('/userRole', userRoleRoute);
app.use('/engineer', engineerRoleRoute);
app.use('/auth', authApiRoute);


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
