'use strict';

var binaryClient = new BinaryClient(`ws://${window.location.hostname}:9000`);

function emit(event, data, file) {
  file = file || {}; data = data || {}; data.event = event;
  console.time('binary');
  return binaryClient.send(file, data);
}

function requestMusic(filePath, that) {
  that.playStatus = LOADING_STATUS;
  emit('request', { filePath: filePath });
}

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
