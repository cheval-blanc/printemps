'use strict';

var client = new BinaryClient('ws://' + window.location.hostname + ':9000'),
    audioCtx = new Audio();

function emit(event, data, file) {
    file = file || {}; data = data || {}; data.event = event;
    console.time('binary');
    return client.send(file, data);
}

client.on('stream', (stream, meta) => {
    var parts = [];

    stream.on('data', data => {
        parts.push(data);
    });

    stream.on('end', () => {
        console.timeEnd('binary');

        var blob = new Blob(parts);
        audioCtx.src = (window.URL || window.webkitURL).createObjectURL(blob);

        var playPromise = audioCtx.play();
        if(playPromise !== undefined) {
            var scope$ = angular.element($('.header-play')).scope();
            playPromise.then(() => {
                //@@ play an audio file?
                scope$.$apply(() => { scope$.status = 'pause'; });
            }).catch(e => {
                scope$.$apply(() => { scope$.status = 'frown-o'; });
                alert(e);
            });
        }

    });
});
