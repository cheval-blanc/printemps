'use strict';

angular.module('printemps').controller('barController', function($scope) {
	
	$scope.current = (audioCtx.currentTime===0) ? '00:00' : audioCtx.currentTime;
	$scope.duration = (isNaN(audioCtx.duration)) ? '00:00' : audioCtx.duration;
	
	(function() {
		//console.log(audioCtx.currentTime);
		//console.log(audioCtx.duration);
	}());
	

});
