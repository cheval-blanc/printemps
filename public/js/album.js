'use strict';

angular.module('printemps').controller('albumController', function($scope, $http) {    
    var selectedAlbum = null,
        scope$ = angular.element($('.header-play')).scope();

    $scope.albums = [];

    (function() {
        listMusics();
        $('.shape').shape();
    }());

    function getImage(format, data) {
        var base64String = '';
        for(let i=0, ni=data.length; i<ni; i+=1) { base64String += String.fromCharCode(data[i]); }
        return 'data:{0};base64,{1}'.format(format, window.btoa(base64String));
    }

    function listMusics() {
        $scope.albums = [];
        $http.post('/', null).then(res => {
            //console.log('albumCount:', res.data.length);
            res.data.forEach((e, i) => {
                $scope.albums[i] = {
                    artist: e.artist,
                    title: e.title,
                    year: e.musics[0].year.substr(0, 4),//@@
                    image: getImage(e.format, e.image),
                    musics: e.musics.sort((m, _m) => { return m.track - _m.track; })
                };
            });
        });
    }

    function flipShape(selected, behavior) {
        var query = '[id="{0}@{1}"]'.format(selected[0], selected[1]);
        $(query).shape(behavior);
    }

    $scope.showMusics = function(artist, title) {
        if(selectedAlbum !== null){ flipShape(selectedAlbum, 'flip back'); }
        selectedAlbum = [artist, title];
        flipShape(selectedAlbum, 'flip over');
    };

    $scope.showAlbum = function(artist, title) {
        flipShape(selectedAlbum, 'flip back');
        selectedAlbum = null;
    };

    $scope.playMusic = function(album, music, index) {
        // console.log(album.musics, index);
        scope$.play(album, index);
    };

});
