'use strict';

angular.module('printemps').controller('barController', function($scope) {
	
	$scope.current = $scope.duration = '0:00';
	

}).directive('playTime', function($interval) {
	return function(scope, element, attrs) {
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
		
		var stopTime = null;
		var updateTime = function() {
			scope.current = secondsToHms(audioCtx.currentTime);
			scope.duration = secondsToHms(audioCtx.duration - audioCtx.currentTime);
		};
		
		scope.$watch(function() { return audioCtx.paused; }, function(value) {
			console.log('paused:', audioCtx.paused);
			
			if(audioCtx.paused) { $interval.cancel(stopTime); }
			else { stopTime = $interval(updateTime, 500); updateTime(); }
		});
		
		element.on('$destroy', function() { $interval.cancel(stopTime); });
	};
});
