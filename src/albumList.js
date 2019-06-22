'use strict';

import axios from 'axios';
import requestMusic from './binaryClient';

function getImage(format, data) {
  const base64String = data.reduce((str, datum) => str += String.fromCharCode(datum), '');
  return `data:${format};base64,${window.btoa(base64String)}`;
}

function listMusics(that) {
  that.albums = [];

  console.time('axios-webpack');
  axios.post('/list', null).then(({ data }) => {
    console.timeEnd('axios-webpack');

    that.albums = data.map(({ artist, title, format, image, musics }) => {
      return {
        isFlipped: false,
        artist,
        title,
        year: musics[0].year.substr(0, 4),
        image: getImage(format, image),
        musics: musics.sort((m, m0) => m.track - m0.track),
      };
    });
  }).catch(err => {
    console.error(err);
  });
}

export let albumListCtrl = {
  mounted() {
    listMusics(this);
  },
  data: {
    albums: [],
    flippedIndex: -1,
  },
  methods: {
    onFlip(album) { album.isFlipped = !album.isFlipped; },
    flipOver(album, albumIndex) {
      if(this.flippedIndex !== -1) { this.albums[this.flippedIndex].isFlipped = false; }
      this.flippedIndex = albumIndex;
      this.onFlip(album);
    },
    flipBack(album) {
      this.flippedIndex = -1;
      this.onFlip(album);
    },
    reqAndSetMusic(album, music, musicIndex) {
      requestMusic(music.file, this);
      this.title = music.title;
      this.artist = album.artist;
      this.album = album.title;
      this.albumArt = album.image;

      this.queue = album.musics;
      this.currentTrack = musicIndex;
    },
  }
};
