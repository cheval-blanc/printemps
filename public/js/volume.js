'use strict';

angular.module('printemps').controller('volumeController', function($scope) {
	$scope.scale = 'up';
	
	var volumeDrag = false;
	var barMin = $('.header-volume .volume-bar').offset().left;
	var barWidth = $('.header-volume .volume-bar').width();
	var circleMax = parseInt($('#volume-container').css('margin-left').replace('px', ''));
	
	var updateVolume = function(pageX, _r) {
		var ratio = 0;
		if(_r) {
			ratio = _r;
		} else {
			ratio = (pageX - barMin) / barWidth; // Normalize 0-1
			ratio = (ratio > 1) ? 1 : (ratio < 0) ? 0 : ratio;
		}
		
		var pos = ratio * barWidth + (circleMax - barWidth);
		$('#volume-container').css('margin-left', pos + 'px');
		
		audioCtx.volume = ratio;
		if(audioCtx.muted) { $scope.scale = 'off'; return; }
		$scope.scale = (ratio === 0) ? 'off' : (ratio > 0.5) ? 'up' : 'down';
	};
	
	/*(function() {
		console.log(audioCtx.volume);
	}());*/
	
	$scope.mute = function() {
		audioCtx.muted = !audioCtx.muted;
		(audioCtx.muted) ? $scope.scale='off' : updateVolume(0, audioCtx.volume);
	};
	
	$scope.mDown = function($event) {
		volumeDrag = true;
		updateVolume($event.pageX);
	};
	
	$scope.mUp = function($event) {
		if(volumeDrag) {
			volumeDrag = false;
			updateVolume($event.pageX);
		}
	};
	
	$scope.mMove = function($event) {
		if(volumeDrag) { updateVolume($event.pageX); }
	};
});

