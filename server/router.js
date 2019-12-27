import path from 'path';

import { listAlbums } from './mongo/controllers/albumController';

export default function(app) {
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../index.html'));
  });

  app.get('/albums/:pageNumber/:itemCount', async ({ params }, res) => {
    const { pageNumber, itemCount } = params;

    const albums = await listAlbums(Number(pageNumber), Number(itemCount));
    res.json(albums);
  });
}
