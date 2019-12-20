import path from 'path';
import fs from 'fs';
const fsPromises = fs.promises;

import { AUDIO_PATH } from '../../path';
import readMediaTags from './mediaTagsReader';
import { importAlbums } from '../controllers/albumController';

class Album {
  constructor({ artist, album, year, picture }) {
    this.artist = artist;
    this.title = album;
    this.year = new Date(year).getFullYear();
    this.albumArtFormat = picture.format;
    this.albumArtBytes = picture.data;
    this.tracks = [];
  }
}

class Track {
  constructor({ track, title }, filePath) {
    this.trackNumber = track;
    this.title = title;
    this.filePath = filePath.replace(`${AUDIO_PATH}\\`, '').replace(/\\/g, '/');
  }
}

async function openDirectory(dirPath) {
  try {
    return await fsPromises.readdir(dirPath);
  } catch (e) {
    fs.mkdirSync(dirPath);
    console.log(`Directory is created: "${dirPath}"`);
    return null;
  }
}

async function walkDirectory(dirPath) {
  try {
    const dirs = await openDirectory(dirPath);
    if (dirs === null) {
      return [];
    }

    const files = await Promise.all(
      dirs.map(async file => {
        const filePath = path.join(dirPath, file);
        const stats = await fsPromises.stat(filePath);

        if (stats.isDirectory()) {
          return walkDirectory(filePath);
        } else if (stats.isFile()) {
          return filePath;
        }
      }),
    );

    return files.reduce((all, f) => all.concat(f), []);
  } catch (e) {
    console.error(e);
  }
}

async function makeAlbumMap(audioFiles) {
  return audioFiles.reduce(async (prevMap, file) => {
    const map = await prevMap;

    try {
      const tags = await readMediaTags(file);

      const key = `${tags.artist}@${tags.album}`;
      map[key] = map[key] || new Album(tags);
      map[key].tracks.push(new Track(tags, file));
    } catch (e) {
      console.error(`file: ${file}`, e);
    } finally {
      return map;
    }
  }, Promise.resolve({}));
}

export default async function() {
  try {
    console.time('importAudioFiles()');

    const audioFiles = await walkDirectory(AUDIO_PATH);

    if (audioFiles.length === 0) {
      console.warn(`No files in "${AUDIO_PATH}"`);
    } else {
      const albumMap = await makeAlbumMap(audioFiles);

      const { upsertedCount, modifiedCount } = await importAlbums(albumMap);
      console.log(`upserted: ${upsertedCount}, modified: ${modifiedCount}`);
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.timeEnd('importAudioFiles()');
  }
}
