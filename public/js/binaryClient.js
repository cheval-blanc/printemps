'use strict';

/*function url(s) {
    var l = window.location;
    return ((l.protocol === "https:") ? "wss://" : "ws://") + l.hostname + (((l.port != 80) && (l.port != 443)) ? ":" + l.port : "") + l.pathname + s;
}*/

//var client = new BinaryClient(url('binary-endpoint'));
//var client = new BinaryClient('ws://localhost:9000');
var hostname = window.location.hostname,
    client = new BinaryClient('ws://' + hostname + ':9000');
var audioCtx = new Audio();

var jsmediatags = window.jsmediatags;


var emit = function(event, data, file) {
    file = file || {}; data = data || {}; data.event = event;
    return client.send(file, data);
};

var setAudioInfo = function(blob) {
    jsmediatags.read(blob, {
        onSuccess: function(tag) {
            console.log(tag);

            var image = tag.tags.picture;
            if(image) {
                var base64String = '';
                for(var i=0, ni=image.data.length; i<ni; i++) {
                    base64String += String.fromCharCode(image.data[i]);
                }
                var base64 = 'data:' + image.format + ';base64,' + window.btoa(base64String);
                $('#thumbnail').attr('src', base64);
                //@@
                $('#thumbnail').css('display', 'block');
            } else {
                //@@ set default image
            }

            $('#title').text(tag.tags.title);
            $('#album').text(tag.tags.artist + ' - ' + tag.tags.album);
            //$('#album').text(tag.tags.artist + ' - ' + tag.tags.album + 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
        },
        onError: function(e) {
            console.error(e);
        }
    });
};

client.on('stream', function(stream, meta) {
    var parts = [];

    stream.on('data', function(data) {
        parts.push(data);
    });

    stream.on('end', function() {
        console.log('binary end');

        var blob = new Blob(parts);
        audioCtx.src = (window.URL || window.webkitURL).createObjectURL(blob);

        var scope$ = angular.element($('.header-play')).scope();
        var playPromise = audioCtx.play();
        if(playPromise !== undefined) {
            playPromise.then(function() {
                // play an audio file?
                scope$.$apply(function() { scope$.status = 'pause'; });

            }).catch(function(e) {
                scope$.$apply(function() { scope$.status = 'frown-o'; });
                alert(e);
            });
        }

        setAudioInfo(blob);
    });
});
