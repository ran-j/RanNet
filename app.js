var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');

// =================================================
//  Import lisb and middlewares
// =================================================

var Prometheus = require('./libs/prometheus');
var LoginRequired = require('./Middlewares/LoginRequired');

// =================================================
//  Routers files
// =================================================

var index = require('./routes/index');
var raven = require('./routes/raven');
var eliza = require('./routes/elizaBot');

// =================================================
//  GLOBAL VARS
// =================================================

global.config = require('./bin/config')
global.debug = require('debug')('rannet2:server');
global.Home = __dirname;

// =================================================
//  Express config
// =================================================

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//metrics
app.use(Prometheus.requestCounters);
app.use(Prometheus.responseCounters);

Prometheus.startCollection();

//set session
app.use(session({
  name: config.cookies.nome,
  secret: config.cookies.secret,
  resave: true,
  saveUninitialized: false,
  // cookie: { maxAge: 24 * 60 * 60 * 1000, secure: true, httpOnly: true },
  cookie: {
    maxAge: 24 * 60 * 60 * 60 * 60 * 1000
  },
  store: new MongoStore({
    mongooseConnection: require('./db/index')
  })
}));

app.use(logger('dev'));
app.use(bodyParser.json({ limit: '9950mb' }));
app.use(bodyParser.urlencoded({
  limit: '9950mb',
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));

//global variables
app.use((req, res, next) => {
  res.locals.version = '1.0.0'
  res.locals.home = 'active'
  res.locals.uploads = ''
  res.locals.downloads = ''
  res.locals.chat = ''
  res.locals.notes = ''
  next();
})

/**
 * Enable metrics endpoint
 */
Prometheus.injectMetricsRoute(app);

// =================================================
//  Routes
// =================================================

app.use('/raven', raven);
app.use('/eliza', eliza);
app.use('/', index);

// =================================================
//  Errors handler
// =================================================

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if(req.app.get('env') === 'development') return res.render('error');

  // render the error page
  res.status(err.status || 500);
  if (err.status == 404) {
    res.render('Erro/pageerro', { title: 'erro 404', msg1: 'A página solicitada não foi encontrada', msg2: 'Favor verificar a URL.' });
  } else if (err.status == 403) {
    res.render('Erro/pageerro', { title: 'erro 403', msg1: 'Você não possui permissão de aceeso nessa url', msg2: 'Favor contatar o administrador do sistema.' });
  } else {
    res.render('Erro/pageerro', { title: 'erro 500', msg1: 'Erro interno do servidor', msg2: 'Favor contatar o administrador do sistema.' });
  }
});

module.exports = app;