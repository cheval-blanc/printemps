import path from 'path';

import { listAlbums } from './mongo/controllers/albumController';

export default function(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });

  app.get('/albums/:albumCount/:reqCount', async ({ params }, res) => {
    const { albumCount, reqCount } = params;

    const albums = await listAlbums(Number(albumCount), Number(reqCount));
    res.json(albums);
  });
}
