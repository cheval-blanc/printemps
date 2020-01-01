import path from 'path';

import { AUDIO_PATH, IMAGE_PATH } from '../../path';
import { openDirectory, getFileList, saveImageFile } from './fsUtil';
import readMediaTags from './mediaTagsReader';
import { importAlbums } from '../controllers/albumController';

class Album {
  constructor({ artist, album, year }, fileName) {
    this.artist = artist;
    this.title = album;
    this.year = new Date(year).getFullYear();
    this.albumArt = fileName;
    this.tracks = [];
  }
}

class Track {
  constructor({ track, title }, filePath) {
    this.trackNumber = track;
    this.title = title;
    this.filePath = filePath.replace(`${AUDIO_PATH}${path.sep}`, '');
  }
}

async function makeAlbumMap(audioFiles) {
  return audioFiles.reduce(async (prevMap, file) => {
    const map = await prevMap;

    try {
      const tags = await readMediaTags(file);

      const key = `${tags.artist}@${tags.album}`;
      if (map[key] === undefined) {
        const fileName = await saveImageFile(tags.picture, key, IMAGE_PATH);
        map[key] = new Album(tags, fileName);
      }

      map[key].tracks.push(new Track(tags, file));
    } catch (e) {
      console.error(`filePath: ${file}`, e);
    } finally {
      return map;
    }
  }, Promise.resolve({}));
}

export default async function() {
  try {
    console.time('importAudioFiles()');

    const audioFiles = await getFileList(AUDIO_PATH);
    await openDirectory(IMAGE_PATH);

    if (audioFiles.length === 0) {
      console.warn(`No files in "${AUDIO_PATH}"`);
    } else {
      const albumMap = await makeAlbumMap(audioFiles);

      const res = await importAlbums(albumMap);
      if (res !== undefined) {
        const { upsertedCount, modifiedCount } = res;
        console.log(`upserted: ${upsertedCount}, modified: ${modifiedCount}`);
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    console.timeEnd('importAudioFiles()');
  }
}
