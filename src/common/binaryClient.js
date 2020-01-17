import { BinaryClient } from 'binaryjs-client';
import store from '../store';

const { protocol, hostname } = window.location;
const binaryClient = new BinaryClient(
  `${protocol === 'https:' ? 'wss' : 'ws'}://${hostname}:9000`,
);

binaryClient.on('stream', (stream, meta) => {
  const parts = [];

  stream.on('data', data => {
    parts.push(data);
  });

  stream.on('end', () => {
    console.log('BinaryJS Stream Ended:', parts.length);

    store.commit('audioCtx/setAudioSrc', parts);
    store.dispatch('audioCtx/playAudio');
  });

  stream.on('error', err => {
    console.error('BinaryJS Error:', err);
  });
});

window.addEventListener('beforeunload', () => {
  if (binaryClient !== null) {
    binaryClient.close();
  }
});

export function emit(filePath) {
  const data = {};
  binaryClient.send(data, {
    filePath,
  });
}
