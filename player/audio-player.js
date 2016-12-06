var fs = require('fs');

exports.play = function(req, res) {
	var filepath = __dirname + "/05 I'm Not the Only One.mp3";
//	var file = fs.createReadStream(filepath);
	
	console.log(req.body.title);

	
	// res.sendfile(filepath);
	res.send(filepath);
};
