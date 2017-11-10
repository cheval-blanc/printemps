'use strict';

angular.module('printemps', []);

angular.module('printemps').controller('playController', function($scope) {
    $scope.status = 'play';
    $scope.current = $scope.remain = '0:00';

    var barWidth = parseInt($('#header-bar').css('width'));
    $scope.move = function($event, _ratio) {
        if(audioCtx.src === '') { return; }

        var ratio = (_ratio !== undefined) ? _ratio : $event.pageX / barWidth;
        $('.bar-gauge').css('width', (ratio * 100) + '%');
        audioCtx.currentTime = audioCtx.duration * ratio;

        $scope.current = secondsToHms(audioCtx.currentTime);
        $scope.remain = secondsToHms(audioCtx.duration - audioCtx.currentTime);
    };

    $scope.title = $scope.artist = $scope.album = '';

    function setAlbumInfo(album, music) {
        $('#thumbnail, #header-info i').css('display', 'inline');
        $('#thumbnail').attr('src', album.image);
        $scope.title = music.title;
        $scope.artist = album.artist;
        $scope.album = album.title;
    }

    var queue = null,
        currentIndex = -1;
    $scope.play = function(album, index) {
        if(album !== undefined) {
            $scope.status = 'spinner fa-spin';
            queue = album.musics;
            currentIndex = index;

            let music = queue[index];
            setAlbumInfo(album, music);
            requestMusic(music.file);
        } else if($scope.status === 'play' && audioCtx.src !== '') {
            //@@ play randomly when there is no downloaded music?
            $scope.status = 'pause';
            audioCtx.play();
        } else if($scope.status === 'pause') {
            $scope.status = 'play';
            audioCtx.pause();
        }
    };

    function moveQueue(flag) {
        if(queue === null) { console.error('NO QUEUE'); return; }

        var ql = queue.length,
            index = currentIndex + flag;
        currentIndex = (index===ql) ? index-ql : (index===-1) ? index+ql : index;

        var music = queue[currentIndex];
        $scope.status = 'spinner fa-spin';
        $scope.title = music.title;
        requestMusic(music.file);
    }

    $scope.playNext = function() { moveQueue(1); };

    $scope.playPrevious = function() {
        (audioCtx.currentTime > 10) ? $scope.move(null, 0) : moveQueue(-1);
    };

}).directive('playTime', function($interval) {
    return function(scope$, element, attrs) {
        function updateTime() {
            var c = audioCtx.currentTime,
                d = audioCtx.duration;
            scope$.current = secondsToHms(c);
            scope$.remain = secondsToHms(d - c);
            $('.bar-gauge').css('width', (c / d * 100) + '%');
        }

        var stopTime = null;
        scope$.$watch(() => { return audioCtx.paused; }, paused => {
            //console.log('paused:', paused);
            if(paused) {
                $interval.cancel(stopTime);
                scope$.status = 'play';
                if(audioCtx.ended) { scope$.playNext(); }
            } else {
                stopTime = $interval(updateTime, 30);
                updateTime();
            }
        });

        element.on('$destroy', () => { $interval.cancel(stopTime); });
    };
});
