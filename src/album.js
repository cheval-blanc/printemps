'use strict';

import axios from 'axios';
import requestMusic from './binaryClient';

function getImage(format, data) {
  var base64String = '';
  for(let i=0, ni=data.length; i<ni; i+=1) { base64String += String.fromCharCode(data[i]); }
  return `data:${format};base64,${window.btoa(base64String)}`;
}

function listMusics(that) {
  that.albums = [];

  console.time('axios-webpack');
  axios.post('/list', null).then(res => {
    console.timeEnd('axios-webpack');
    let data = res.data;
    for(let i=0, ni=data.length; i<ni; i+=1) {
      let datum = data[i],
        musics = datum.musics;

      that.albums.push({
        isFlipped: false,
        artist: datum.artist,
        title: datum.title,
        year: musics[0].year.substr(0, 4),
        image: getImage(datum.format, datum.image),
        musics: musics.sort((m, m0) => { return m.track - m0.track; }),
      });
    }
  }).catch(err => {
    console.error(err);
  });
}

export var albumCtrl = {
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
