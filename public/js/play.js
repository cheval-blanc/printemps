'use strict';

angular.module('printemps', []);

angular.module('printemps').controller('playController', function($scope) {	
	$scope.status = 'play';
	
	var secondsToHms = function(t) {
		t = Number(t);
		var h = Math.floor(t / 3600);
		var m = Math.floor(t % 3600 / 60);
		var s = Math.floor(t % 3600 % 60);
		
		var str = (h>1) ? h + ':' : '';
		str += m + ':' + ('0' + s).slice(-2);
		return str;
	};
	
	$scope.play = function() {
		//$scope.status = ($scope.status==='play') ? 'pause' : 'play';
		
		if($scope.status === 'play') {
			console.log('play');
			
			$scope.status = 'pause';
			if(audioCtx.src !== '') { audioCtx.play(); }
			else { emit('request', { name: 'Sam Smith' }); }
			
		} else if($scope.status === 'pause') {
			console.log('pause');
			
			console.log(audioCtx.currentTime, secondsToHms(audioCtx.currentTime));
			console.log(audioCtx.duration, secondsToHms(audioCtx.duration));
			
			$scope.status = 'play';
			audioCtx.pause();
		}
	};
	
});
