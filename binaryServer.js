'use strict';

var BinaryServer = require('binaryjs').BinaryServer,
  fs = require('fs');

var binaryServer = new BinaryServer({ port: 9000 });

binaryServer.on('connection', client => {
  console.log('binaryjs server connected');

  client.on('stream', (stream, meta) => {
    if(meta.event !== 'request') { console.log('Only "request" event is supported'); return; }

    console.log('request:', meta.filePath);
    var file = fs.createReadStream(__dirname + '/audio_files/' + meta.filePath);

    file.on('error', err => {
      console.log('Exception:', err);
      client.send('error');
    });

    client.send(file);
  });
});
