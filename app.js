var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var formidable = require('formidable');

var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var ravenAI = require('./routes/raven');

var app = express();

//mongoose.connect('mongodb://rannet03:ra74189520@mongodb.rannet.com.br:27017/rannet03');
mongoose.connect('mongodb://localhost:27017/Rannet', { useNewUrlParser: true });
var db = mongoose.connection;

//handle mongo error
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Conectado com a DB");
  console.log("RanNet online");
});

//use sessions for tracking logins
app.use(session({
	name: 'RanNet',
	secret: 'p6KPL0Qq5ri1H7q2Gws7zPdMcA8sU3ulaQdNkIG5zc5jlSPYZkEzrtoRFFQBuOdlBojwqKIcozCOGvJtcokklIwthiGCYbuMv5ywlvoPcBmMc56FGDMBvoNNWE0W6FHR',
	resave: true,
	saveUninitialized: false,
	cookie: { maxAge: 24 * 60 * 60 * 1000 },
	store: new MongoStore({
		mongooseConnection: db
	})
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({limit: '1024mb'}));
app.use(express.urlencoded({ extended: false, limit: '1024mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/raven', ravenAI);

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
  if(err.status == 404){
    res.render('Erro/pageerro', { title: 'erro 404', msg1: 'A página solicitada não foi encontrada', msg2: 'Favor verificar a URL.' });
  }else if(err.status == 403) {
    res.render('Erro/pageerro', { title: 'erro 403', msg1: 'Você não possui permissão de aceeso nessa url', msg2: 'Favor contatar o administrador do sistema.' });
  }else{
    res.render('Erro/pageerro', { title: 'erro 500', msg1: 'Erro interno do servidor', msg2: 'Favor contatar o administrador do sistema.' });
  }
});

module.exports = app;
