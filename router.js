var controller = require('./controller/controller.js');

exports.route = function(app) {
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/view/index.html');
	});
	
	app.post('/play', function(req, res) {
		controller.play(req, res);
	});
};
