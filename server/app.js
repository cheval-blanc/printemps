import path from 'path';
import http from 'http';
import express from 'express';
import session from 'express-session';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import logger from 'morgan';
import errorHandler from 'errorhandler';
import favicon from 'serve-favicon';

import connectMongo from './mongo';
import route from './router';
import * as binaryJs from './binaryJs';

const app = express();
const NODE_ENV = app.get('env');

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'html');
app.use(favicon(path.resolve(__dirname, '../src/assets/favicon.ico')));
app.use(logger('dev'));
app.use(methodOverride());
app.use(
  session({
    secret: 'uwotm8',
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../dist')));

if (NODE_ENV === 'development') {
  app.use(errorHandler());
}

connectMongo();
route(app);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`Server is listening on port ${app.get('port')}`);
});

if (NODE_ENV === 'development') {
  binaryJs.createBinaryServerForDev();
} else if (NODE_ENV === 'production') {
  binaryJs.createBinaryServerForProd(server);
}
