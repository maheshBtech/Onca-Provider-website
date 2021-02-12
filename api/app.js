var express = require('express');
var path = require('path');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
var winston = require('./src/config/winston');
var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/routes/users');
var loginRouter = require('./src/routes/login');
var authRouter = require('./src/routes/auth');
var initGet = require('./src/routes/initGet');
var ping = require('./src/routes/ping');
const environment = require('./src/config/environment');
var apiRoot = environment.getApi();
var morgan = require('morgan');
var passport = require('passport');
//var apiRoot = '/api/';
var app = express();
var cors = require('cors');
const dotenv = require('./dotenvSetup');
dotenv.initenv();

app.use(morgan('combined', { stream: winston.stream }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
// use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: process.env.ALLOWCORSURL,
    // origin: 'http://localhost:4000',
    credentials: true,
  })
);

var session = require("express-session"),
  bodyParser = require("body-parser");


app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(`${apiRoot}index`, indexRouter);
app.use(`${apiRoot}user`, usersRouter);
app.use(`${apiRoot}login`, loginRouter);
app.use(`${apiRoot}auth`, authRouter);
app.use(`${apiRoot}initGet`, initGet);
app.use(`${apiRoot}ping`, ping);

app.use(`${apiRoot}registration`, require("../api/src/routes/Register&Login/register"));
app.use(`${apiRoot}login`, require("../api//src/routes/Register&Login/register"));

app.route('/').get((req, res) => {
  res.send('Hello world, Welcome to Onca Marketplace');
});

// catch 404 and forward to error handler
// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    'errors': {
      message: err.message,
      error: {}
    }
  });
});
module.exports = app;
