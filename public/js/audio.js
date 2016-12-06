
var jsmediatags = window.jsmediatags;


var app = angular.module('app', []);
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

var audio = new Audio();

client.on('stream', function(stream, meta) {
	var parts = [];
	stream.on('data', function(data) {
		//console.log('data');
		parts.push(data);
	});

	stream.on('end', function() {
		console.log('end');
		var blob = new Blob(parts);
		audio.src = (window.URL || window.webkitURL).createObjectURL(blob);
		//audio.play();
		
		var playPromise = audio.play();
		if(playPromise !== undefined) {
			playPromise.then(function() {
				
			}).catch(function(error) {
				alert(error);
			});
		}
		
		
		//@@
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
		
	});
});

app.controller('audioController', function($scope, $http) {
	
	$scope.status = 'play';
	$scope.play = function() {
		//console.log('audioController.play');
		//$scope.status = ($scope.status==='pause') ? 'play' : 'pause';

		if($scope.status === 'play') {
			console.log('play');
			//$scope.status = 'spinner fa-pulse fa-3x fa-fw';
			$scope.status = 'pause';
			
			if(audio.src !== '') audio.play();
			else emit('request', { name: 'Sam Smith' });
			
		} else if($scope.status === 'pause') {
			console.log('pause');
			$scope.status = 'play';
			audio.pause();
		}

		/*var host = location.origin.replace(/^http/, 'ws') + '/binary-endpoint';
		var client = new BinaryClient(host);
		
		var stream = client.createStream();
		
		
		
		var soundController = {};
		soundController.context = new audioContext();
		
		client.on('stream', function(stream) {
			soundController.nextTime = 0;
			
		});
		
		
		
		steam.write(chunk);
		steam.end();*/
		
		
		
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
		

		// $http({
		// 	method: 'POST',
		// 	url: '/play',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	data: JSON.stringify({
		// 		title: 'abc'
		// 	})
		// }).success(function(data, status, headers, config) {
			
		// 	console.log(data);

		// 	var audio = new Audio();
		// 	audio.src = data;
		// 	audio.play();
			
		// }).error(function(data, status, headers, config) {
		// 	console.log('[error]\t'+data);
		// });

	};

});
