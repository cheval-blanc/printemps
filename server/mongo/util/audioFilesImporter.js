import path from 'path';
import { promises as fs } from 'fs';

import readMediaTags from './mediaTagsReader';
import { importAlbums } from '../controllers/albumController';

const audioFolderName = 'audio_files';

class Album {
  constructor({ artist, album, year, picture }) {
    this.artist = artist;
    this.title = album;
    this.year = new Date(year).getFullYear();
    this.albumArtFormat = picture.format;
    this.albumArtImage = picture.data;
    this.tracks = [];
  }
}

class Track {
  constructor({ track, title }, filePath) {
    this.trackNumber = track;
    this.title = title;
    this.filePath = filePath.replace(/\\/g, '/').split(`${audioFolderName}/`)[1];
  }
}

async function walkDirectory(dirPath) {
  const dirs = await fs.readdir(dirPath);

  const files = await Promise.all(dirs.map(async file => {
    const filePath = path.join(dirPath, file);
    const stats = await fs.stat(filePath);

    if(stats.isDirectory()) {
      return walkDirectory(filePath);
    } else if(stats.isFile()) {
      return filePath;
    }
  }));

  return files.reduce((all, f) => all.concat(f), []);
}

async function makeAlbumMap(audioFiles) {
  return audioFiles.reduce(async (prevMap, file) => {
    const map = await prevMap;
    const tags = await readMediaTags(file);

    const key = `${tags.artist}@${tags.album}`;
    map[key] = map[key] || new Album(tags);
    map[key].tracks.push(new Track(tags, file));

    return map;
  }, Promise.resolve({}));
}

export default async function() {
  console.time('importAudioFiles()');

  const audioFolderPath = path.resolve(__dirname, `../../../${audioFolderName}`);

  const audioFiles = await walkDirectory(audioFolderPath);
  const albumMap = await makeAlbumMap(audioFiles);

  const { upsertedCount, modifiedCount } = await importAlbums(albumMap);
  console.log(`upsertedCount: ${upsertedCount}, modifiedCount: ${modifiedCount}`);

  console.timeEnd('importAudioFiles()');
}
