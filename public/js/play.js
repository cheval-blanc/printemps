'use strict';

angular.module('printemps', []);

angular.module('printemps').controller('playController', function($scope) {	
	$scope.status = 'play';
	
	$scope.play = function() {
		//$scope.status = ($scope.status==='play') ? 'pause' : 'play';
		
		if($scope.status === 'play') {
			console.log('play');
			
			if(audioCtx.src !== '') {
				$scope.status = 'pause';
				audioCtx.play(); 
			} else {
				$scope.status = 'spinner fa-spin';
				emit('request', { name: 'Sam Smith' });
			}
			
		} else if($scope.status === 'pause') {
			console.log('pause');
			
			$scope.status = 'play';
			audioCtx.pause();
		}
	};
	
});
