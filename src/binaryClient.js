'use strict';

// import { BinaryClient } from 'binaryjs';
import { BinaryClient } from './lib/binary.min';

import { PAUSE_STATUS, ERROR_STATUS, LOADING_STATUS } from './common';
import { vueApp } from './main.js';

var binaryClient = new BinaryClient(`ws://${window.location.hostname}:9000`);

binaryClient.on('stream', (stream, meta) => {
  var parts = [];
  stream.on('data', data => { parts.push(data); });

  stream.on('end', () => {
    console.timeEnd('binary');

    var blob = new Blob(parts);
    vueApp.audioCtx.src = (window.URL || window.webkitURL).createObjectURL(blob);

    var playPromise = vueApp.audioCtx.play();
    if(playPromise !== undefined) {
      playPromise.then(() => {
        vueApp.playStatus = PAUSE_STATUS;
      }).catch(err => {
        console.error(err);
        vueApp.playStatus = ERROR_STATUS;
      });
    }

  });
});

function emit(event, data, file) {
  file = file || {}; data = data || {}; data.event = event;
  console.time('binary');
  return binaryClient.send(file, data);
}

export default function requestMusic(filePath, that) {
  that.playStatus = LOADING_STATUS;
  emit('request', { filePath: filePath });
}
