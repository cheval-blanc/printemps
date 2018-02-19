'use strict';

const express = require('express'),
  http = require('http'),
  path = require('path');

const session = require('express-session'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  multer = require('multer'),
  errorHandler = require('errorhandler'),
  favicon = require('serve-favicon');

const app = express();

const ROOT_PATH = __dirname;
const AUDIO_PATH = path.join(ROOT_PATH, 'audio_files');

// All environments for Express
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(favicon(path.join(ROOT_PATH, 'src/assets/favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ secret: 'uwotm8', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(ROOT_PATH, 'dist')));
if('development' === app.get('env')) {
  app.use(errorHandler());
}

require('./server/router.js').route(app, ROOT_PATH);
require('./server/db.js').connect(AUDIO_PATH);
require('./server/binaryServer.js').connect(AUDIO_PATH);

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Printemps server is listening on port ${app.get('port')}`);
});
