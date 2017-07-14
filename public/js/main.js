'use strict';

angular.module('printemps').controller('mainController', function($scope, $http) {

    const ALBUM_ID = '{0}@{1}';
    var selectedAlbum = null;

    $scope.albums = {};

    (function() {
        listMusics();
        $('.shape').shape();
    }());

    function getImage(format, data) {
        var base64String = '';
        for(let i=0, ni=data.length; i<ni; i++) { base64String += String.fromCharCode(data[i]); }
        var base64 = 'data:' + format + ';base64,' + window.btoa(base64String);
        return base64;
    }

    function listMusics() {
        $http.post('/', null).then(function(res) {
            console.log(res.data.length);

            $scope.albums = {};
            res.data.forEach(e => {
                let key = ALBUM_ID.format(e.artist, e.album);
                if(!$scope.albums[key]) {
                    $scope.albums[key] = {};
                    $scope.albums[key].image = getImage(e.format, e.image);
                    $scope.albums[key].artist = e.artist;
                    $scope.albums[key].album = e.album;
                    $scope.albums[key].year = e.year.substr(0, 4);
                    $scope.albums[key].musics = [];
                }
                $scope.albums[key].musics.push({ title: e.title, track: e.track });
            });
        });
    }

    function flipShape(selected, behavior) {
        var id = ALBUM_ID.format(selected[0], selected[1]);
        $("[id='{0}']".format(id)).shape(behavior);
    }

    $scope.showMusics = function(artist, album) {
        if(selectedAlbum !== null){ flipShape(selectedAlbum, 'flip back'); }
        selectedAlbum = [artist, album];
        flipShape(selectedAlbum, 'flip over');
    }

    $scope.showAlbum = function(artist, album) {
        flipShape(selectedAlbum, 'flip back');
        selectedAlbum = null;
    }

    $scope.playMusic = function(artist, album, title) {
        var msg = '{0}/{1}/{2}'.format(artist, album, title);
        console.log(msg);
    };

});
