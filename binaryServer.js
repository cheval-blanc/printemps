var BinaryServer = require('binaryjs').BinaryServer,
	fs = require('fs');

//var binaryServer = new BinaryServer({ server: app, path: '/binary-endpoint' });
var binaryServer = new BinaryServer({ port: 9000 });

binaryServer.on('connection', function(client) {
	console.log('connected');
	
	client.on('stream', function(stream, meta) {
		switch(meta.event) {
			case 'list':
				console.log('list');
				break;
				
			case 'request':
				console.log('request: ' + meta.name);
				//var file = fs.createReadStream(__dirname + "/audio_files/05 I'm Not the Only One.mp3");
				//var file = fs.createReadStream(__dirname + "/audio_files/07 Chopin_ Waltz #7 In C Sharp Minor.m4a");
				var file = fs.createReadStream(__dirname + "/audio_files/01 Hello.m4a");
				
				client.send(file);
				break;
				
			default:
				break;
		}
	});
});

