import path from 'path';
import fs from 'fs';
import { BinaryServer } from 'binaryjs';

import { AUDIO_PATH } from '../path';

export function createBinaryServerForDev() {
  initBinaryServer(new BinaryServer({ port: 9000 }));
}

export function createBinaryServerForProd(server) {
  initBinaryServer(new BinaryServer({ server }));
}

function initBinaryServer(binaryServer) {
  binaryServer.on('connection', client => {
    console.log('BinaryJS Connection Established');

    client.on('stream', (stream, { filePath }) => {
      const fullPath = path.join(AUDIO_PATH, filePath);

      const rs = fs.createReadStream(fullPath);
      client.send(rs);
    });
  });
}
