var controller = require('./controller/controller.js');

exports.route = function(app) {
	app.get('/', function(req, res) {
		res.sendFile(__dirname + '/view/index.html');
	});
	
	app.post('/play', function(req, res) {
		var filepath = __dirname + "/audio_files/01 Hello.m4a";
		res.sendFile(filepath); //@@
	
		//controller.play(req, res, filepath);
	});
};
