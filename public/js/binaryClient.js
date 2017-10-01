'use strict';

var client = new BinaryClient('ws://' + window.location.hostname + ':9000'),
    audioCtx = new Audio();

function emit(event, data, file) {
    file = file || {}; data = data || {}; data.event = event;
    console.time('binary');
    return client.send(file, data);
}

client.on('stream', function(stream, meta) {
    var parts = [];

    stream.on('data', function(data) {
        parts.push(data);
    });

    stream.on('end', function() {
        console.timeEnd('binary');

        var blob = new Blob(parts);
        audioCtx.src = (window.URL || window.webkitURL).createObjectURL(blob);

        var playPromise = audioCtx.play();
        if(playPromise !== undefined) {
            var scope$ = angular.element($('.header-play')).scope();
            playPromise.then(function() {
                //@@ play an audio file?
                scope$.$apply(function() { scope$.status = 'pause'; });
            }).catch(function(e) {
                scope$.$apply(function() { scope$.status = 'frown-o'; });
                alert(e);
            });
        }

    });
});
