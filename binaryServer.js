'use strict';

var BinaryServer = require('binaryjs').BinaryServer,
    fs = require('fs');

var binaryServer = new BinaryServer({ port: 9000 });

binaryServer.on('connection', function(client) {
    console.log('binaryjs server connected');

    client.on('stream', function(stream, meta) {
        switch(meta.event) {
            case 'request':
                console.log('request: ' + meta.name);
                //var file = fs.createReadStream(__dirname + '/audio_files/05 I'm Not the Only One.mp3');
                //var file = fs.createReadStream(__dirname + '/audio_files/07 Chopin_ Waltz #7 In C Sharp Minor.m4a');
                var file = fs.createReadStream(__dirname + '/audio_files/Mate/End of the World/07 Not True.m4a');
                file.on('error', function(err) {
                    console.log('Exception:', err);
                    client.send('error');
                });

                client.send(file);
                break;

            default:
                break;
        }
    });
});
