var app = angular.module('app', []);

app.controller('playController', function($scope, $http) {
	
	$scope.status = 'play';
	$scope.play = function() {
		if($scope.status === 'play') {
			console.log('play');
			
			$scope.status = 'pause';
			if(audioCtx.src !== '') audioCtx.play();
			else emit('request', { name: 'Sam Smith' });
			
		} else if($scope.status === 'pause') {
			console.log('pause');
			
			$scope.status = 'play';
			audioCtx.pause();
		}
	};
	
});

