/*function url(s) {
    var l = window.location;
    return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + l.pathname + s;
}*/

//var client = new BinaryClient(url('binary-endpoint'));
//var client = new BinaryClient('ws://localhost:9000');
var hostname = window.location.hostname,
	client = new BinaryClient('ws://' + hostname + ':9000');

var jsmediatags = window.jsmediatags,
	audioCtx = new Audio();

var emit = function(event, data, file) {
	file = file || {}; data = data || {}; data.event = event;
	return client.send(file, data);
};

var setAudioInfo = function(blob) {
	jsmediatags.read(blob, {
		onSuccess: function(tag) {
			console.log(tag);
			
			var image = tag.tags.picture;
			if(image) {
				var base64String = '';
				for(var i=0, ni=image.data.length; i<ni; i++) {
					base64String += String.fromCharCode(image.data[i]);
				}
				var base64 = 'data:' + image.format + ';base64,' + window.btoa(base64String);
				$('#info').attr('src', base64); //@@
			}
			
			$('#title').text(tag.tags.title);
			$('#album').text(tag.tags.artist + ' - ' + tag.tags.album);
			//$('#album').text(tag.tags.artist + ' - ' + tag.tags.album + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		},
		onError: function(err) {
			console.log(err);
		}
	});
};

client.on('stream', function(stream, meta) {
	var parts = [];
	stream.on('data', function(data) {
		parts.push(data);
	});

	stream.on('end', function() {
		console.log('end');
		var blob = new Blob(parts);
		audioCtx.src = (window.URL || window.webkitURL).createObjectURL(blob);
		
		var playPromise = audioCtx.play();
		if(playPromise !== undefined) {
			playPromise.then(function() {
				
			}).catch(function(error) {
				alert(error);
			});
		}
		
		setAudioInfo(blob);
	});
});

