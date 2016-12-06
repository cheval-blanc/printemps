var express = require('express'),
	http = require('http'),
	path = require('path');

var session = require('express-session'),
	methodOverride = require('method-override'),
	bodyParser = require('body-parser'),
	logger = require('morgan'),
	multer = require('multer'),
	errorHandler = require('errorhandler'),
	favicon = require('serve-favicon');

var app = express();
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('view', path.join(__dirname, '/view'));
app.set('view engine', 'html');
app.use(favicon(__dirname + '/public/images/favicon.ico'));
app.use(logger('dev'));
app.use(methodOverride());
app.use(session({ secret: 'uwotm8', resave: true, saveUninitialized: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());
app.use(express.static(path.join(__dirname, 'public')));
if('development' === app.get('env')) {
	app.use(errorHandler());
}

require('./router.js').route(app);
require('./binaryServer.js');

http.createServer(app).listen(app.get('port'), function() {
	console.log('Printemps server is listening on port ' + app.get('port'));
});

