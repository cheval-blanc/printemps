'use strict';

function getImage(format, data) {
  var base64String = '';
  for(let i=0, ni=data.length; i<ni; i+=1) { base64String += String.fromCharCode(data[i]); }
  return `data:${format};base64,${window.btoa(base64String)}`;
}

function listMusics(that) {
  that.albums = [];

  axios.post('/', null).then(res => {
    let data = res.data;
    for(let i=0, ni=data.length; i<ni; i+=1) {
      let datum = data[i],
        musics = datum.musics;

      that.albums.push({
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

var albumCtrl = {
  mounted() {
    listMusics(this);
  },
  data: {
    albums: [],
  },
  methods: {
    playMusic(album, music, index) {
      requestMusic(music.file, this);
      this.title = music.title;
      this.artist = album.artist;
      this.album = album.title;
      this.albumArt = album.image;

      this.queue = album.musics;
      this.currentTrack = index;
    },
  }
};
