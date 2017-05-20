'use strict';

angular.module('printemps', []);

angular.module('printemps').controller('playController', function($scope) {
    $scope.status = 'play';
    $scope.current = $scope.remain = '0:00';

    $scope.move = function($event) {
        if(audioCtx.src === '') { return; }
        var barWidth = parseInt($('.header-bar').css('width')),
            ratio = $event.pageX / barWidth;

        $('.bar-gauge').css('width', (ratio * 100) + '%');
        audioCtx.currentTime = audioCtx.duration * ratio;

        $scope.current = secondsToHms(audioCtx.currentTime);
        $scope.remain = secondsToHms(audioCtx.duration - audioCtx.currentTime);
    };

    $scope.play = function() {
        if($scope.status === 'play') {
            if(audioCtx.src !== '') {
                $scope.status = 'pause';
                audioCtx.play();
            } else {
                $scope.status = 'spinner fa-spin';
                emit('request', { name: 'Sam Smith' });
            }
        } else if($scope.status === 'pause') {
            $scope.status = 'play';
            audioCtx.pause();
        }
    };
}).directive('playTime', function($interval) {
    return function(scope, element, attrs) {
        var stopTime = null;
        function updateTime() {
            var c = audioCtx.currentTime,
                d = audioCtx.duration;
            scope.current = secondsToHms(c);
            scope.remain = secondsToHms(d - c);
            $('.bar-gauge').css('width', (c / d * 100) + '%');
        }

        scope.$watch(function() { return audioCtx.paused; }, function(paused) {
            console.log('paused:', paused);

            if(paused) { $interval.cancel(stopTime); scope.status = 'play'; }
            else { stopTime = $interval(updateTime, 30); updateTime(); }
        });

        element.on('$destroy', function() { $interval.cancel(stopTime); });
    };
});
