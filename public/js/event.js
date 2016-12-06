function url(s) {
    var l = window.location;
    return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + l.pathname + s;
}

var client = new BinaryClient(url('binary-endpoint'));

client.on('stream', function(stream, meta) {
	var parts = [];
	stream.on('data', function(data) {
		console.log('data');
		
		parts.push(data);
	});
	stream.on('end', function() {
		console.log('end');
		
		var audio = new Audio();
		audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
		audio.play();
	});
});

var currentAudio	= null;
var previousAudio	= null;
var nextAudio		= null;

$('.fa-pause').on({
	click: function() {
		$(this).removeClass('fa-pause');
		$(this).addClass('fa-play');
	}
});

$('.fa-play').on({
	click: function() {
		console.log('clicked');
		
		$(this).removeClass('fa-play');
		$(this).addClass('fa-pause');
		
		/*client.on('stream', function(stream, meta) {
			var parts = [];
			stream.on('data', function(data) {
				console.log('data');
				
				parts.push(data);
			});
			stream.on('end', function() {
				console.log('end');
				
				var audio = new Audio();
				audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
				audio.play();
			});
		});*/
		
		/*$.ajax({
			method: 'POST',
			url: '/play'
		}).done(function(message) {
			console.log(message);
			
			var client = new BinaryClient('ws://localhost:9000');
			client.on('stream', function(stream, meta) {
				var parts = [];
				stream.on('data', function(data) {
					parts.push(data);
				});
				stream.on('end', function() {
					var audio = new Audio();
					audio.src = (window.URL || window.webkitURL).createObjectURL(new Blob(parts));
					audio.play();
				});
			});
		});*/
	}
});
