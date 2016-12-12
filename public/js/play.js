'use strict';

angular.module('printemps', []);

angular.module('printemps').controller('playController', function($scope) {	
	$scope.status = 'play';
	$scope.play = function() {
		//$scope.status = ($scope.status==='play') ? 'pause' : 'play';
		
		if($scope.status === 'play') {
			console.log('play');
			
			$scope.status = 'pause';
			if(audioCtx.src !== '') { audioCtx.play(); }
			else { emit('request', { name: 'Sam Smith' }); }
			
		} else if($scope.status === 'pause') {
			console.log('pause');
			
			$scope.status = 'play';
			audioCtx.pause();
		}
	};
	
});

