var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('dotenv').config();
var session = require('express-session');

// const session = require('express-session');

//app.use(session({
//  secret: 'gfgfgsyfghdvsghfytsf',
 // resave: false,
 // SaveUninitialized: true
//}));

var indexRouter = require('./routes/index');// llama al index.js
//var usersRouter = require('./routes/users');
var nosotrosRouter = require('./routes/nosotros');
var serviciosRouter = require('./routes/servicios');
var galeriaRouter = require('./routes/galeria');
var novedadesRouter = require('./routes/novedades');
var contactoRouter = require('./routes/contacto');
var contactoRouter = require('./routes/contacto');
var loginRouter = require('./routes/admin/login');
var bienvenidoRouter = require('./routes/admin/bienvenido');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '4321',
  // cookie: { maxAge: null},
  resave: false,
  saveUninitialized: true
}))

secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect('/admin/login');
    }
  }catch (error) {
    console.log(error);
  }
}

app.use('/', indexRouter);
app.use('/nosotros',nosotrosRouter);
app.use('/servicios',serviciosRouter);
app.use('/galeria',galeriaRouter);
app.use('/novedades',novedadesRouter);
app.use('/contacto',contactoRouter);
app.use('/admin/login' ,loginRouter);
app.use('/admin/bienvenido' ,secured, bienvenidoRouter);
//app.use('/users', usersRouter);

app.get('/prueba', function(req,res){
  res.send('Hola soy la pagina de prueba')
})

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

