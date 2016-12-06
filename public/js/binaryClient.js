/*function url(s) {
    var l = window.location;
    return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + l.pathname + s;
}*/

//var client = new BinaryClient(url('binary-endpoint'));
//var client = new BinaryClient('ws://localhost:9000');
var hostname = window.location.hostname;
var client = new BinaryClient('ws://' + hostname + ':9000');

var emit = function(event, data, file) {
	file = file || {};
	data = data || {};
	data.event = event;
	
	return client.send(file, data);
};


/*var download = function(stream, cb) {
	var parts = [];
	stream.on('stream', function(data) {
		console.log('1');
		parts.push(data);
	});
	stream.on('error', function(err) {
		console.log('2');
		cb(err);
	});
	stream.on('end', function() {
		console.log('3');
		
		var audio = new Audio();
		console.log('4');
		
		audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
		console.log('5');
		
		cb(null, audio);
	});
};

client.on('stream', function(stream) {
	download(stream, function(err, audio) {
		
		
		//var audio = new Audio();
		//audio.src = src;
		audio.play();
	});
});*/
