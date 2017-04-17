'use strict';

angular.module('printemps').controller('barController', function($scope) {
    $scope.current = $scope.remain = '0:00';

    $scope.move = function($event) {
        if(audioCtx.src === '') { return; }
        var barWidth = parseInt($('.header-bar').css('width')),
            ratio = $event.pageX / barWidth;

        $('.bar-gauge').css('width', (ratio * 100) + '%');
        audioCtx.currentTime = audioCtx.duration * ratio;
    };

}).directive('playTime', function($interval) {
    return function(scope, element, attrs) {
        function secondsToHms(t) {
            t = Number(t);
            if(isNaN(t) || t === 0){ return '0:00'; }
            var h = Math.floor(t / 3600),
                m = Math.floor(t % 3600 / 60),
                s = Math.floor(t % 3600 % 60);

            var hms = (h>1) ? h + ':' : '';
            hms += m + ':' + ('0' + s).slice(-2);
            return hms;
        }

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

            if(paused) { $interval.cancel(stopTime); }
            else { stopTime = $interval(updateTime, 30); updateTime(); }
        });

        element.on('$destroy', function() { $interval.cancel(stopTime); });
    };
});
