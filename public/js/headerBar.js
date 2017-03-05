'use strict';

angular.module('printemps').controller('barController', function($scope) {
	
	var secondsToHms = function(t) {
		t = Number(t);
		if(isNaN(t) || t === 0){ return '0:00'; }
		var h = Math.floor(t / 3600),
			m = Math.floor(t % 3600 / 60),
			s = Math.floor(t % 3600 % 60);
		
		var hms = (h>1) ? h + ':' : '';
		hms += m + ':' + ('0' + s).slice(-2);
		return hms;
	};
	
	$scope.current = $scope.duration = '0:00';
	
	$scope.$watch(function() { return secondsToHms(audioCtx.currentTime); }, function(newValue, oldValue) {
		if(newValue === oldValue) { return; }
		
		//console.log(audioCtx.currentTime);
		$scope.current = secondsToHms(audioCtx.currentTime);
		$scope.duration = secondsToHms(audioCtx.duration - audioCtx.currentTime);
	});
	

});
