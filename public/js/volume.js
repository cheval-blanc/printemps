'use strict';

angular.module('printemps').controller('volumeController', function($scope) {
  $scope.scale = 'up';

  var barMin = $('#header-volume .volume-bar').offset().left,
    barWidth = $('#header-volume .volume-bar').width(),
    circleMax = parseInt($('#volume-container').css('margin-left'));

  var volumeDrag = false;

  function updateVolume(pageX, _ratio) {
    var ratio = 0;
    if(_ratio !== undefined) {
      ratio = _ratio;
    } else {
      ratio = (pageX - barMin) / barWidth; // Normalize 0-1
      ratio = (ratio > 1) ? 1 : (ratio < 0) ? 0 : ratio;
    }

    var pos = ratio * barWidth + (circleMax - barWidth);
    $('#volume-container').css('margin-left', pos + 'px');

    audioCtx.volume = ratio;
    if(audioCtx.muted) { audioCtx.muted = false; }
    $scope.scale = (ratio === 0) ? 'off' : (ratio > 0.5) ? 'up' : 'down';
  }

  $scope.mute = function() {
    audioCtx.muted = !audioCtx.muted;
    (audioCtx.muted) ? $scope.scale='off' : updateVolume(0, audioCtx.volume);
  };

  $scope.clickVolumeBar = function($event) {
    updateVolume($event.pageX);
  };

  $scope.mDownVolume = function($event) {
    volumeDrag = true;
    $event.preventDefault();
    updateVolume($event.pageX);
  };

  $scope.mUpVolume = function($event) {
    if(volumeDrag) {
      volumeDrag = false;
      updateVolume($event.pageX);
    }
  };

  $scope.mMoveVolume = function($event) {
    if(volumeDrag) { updateVolume($event.pageX); }
  };
});
