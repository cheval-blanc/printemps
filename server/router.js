import path from 'path';

import { listAlbums } from './mongo/controllers/albumController';

export default function(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });

  app.get('/albums', async (reg, res) => {
    const albums = await listAlbums();
    res.json(albums);
  });
}
