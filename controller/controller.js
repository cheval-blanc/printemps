var player = require('../player/audio-player.js');

exports.play = function(req, res) {
	player.play(req, res);
};
