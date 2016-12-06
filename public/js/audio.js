var app = angular.module('app', []);

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

	};

});

