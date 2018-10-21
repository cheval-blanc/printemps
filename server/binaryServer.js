'use strict';

const BinaryServer = require('binaryjs').BinaryServer,
  fs = require('fs'),
  path = require('path');

exports.connect = function(audioPath) {
  let binaryServer = new BinaryServer({ port: 9000 });

  binaryServer.on('connection', client => {
    console.log('binaryjs server connected');

    client.on('stream', (stream, meta) => {
      if(meta.event !== 'request') { console.log('Only "request" event is supported'); return; }

      console.log('request:', meta.filePath);
      let file = fs.createReadStream(path.join(audioPath, meta.filePath));

      file.on('error', err => {
        console.log('Exception:', err);
        client.send('error');
      });

      client.send(file);
    });
  });
};
