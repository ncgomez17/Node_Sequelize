var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var commentsRouter = require('./routes/comment');
var tutorialsRouter = require('./routes/tutorial');

var app = express();
const helmet = require("helmet");

//Uso por defecto
app.use(helmet())

//Activar individualmente las cabeceras
/* app.use(helmet.noCache())
app.use(helmet.frameguard())
 */
//Deshabilitar alguna funcionalidad y usar el resto por defecto
/* app.use(helmet({
  frameguard:false
})) */

//Sin embargo con el caso de contentSecurityPolicy es necesario configurarlo.
/* app.use(helmet({
  contentSecurityPolicy: {
      directives: {
          defaultSrc:"ruta",
          scriptSrc:"ruta",
      }
  }
})); */
const db = require("./models");
db.sequelize.sync();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);
app.use('/tutorials', tutorialsRouter);

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
