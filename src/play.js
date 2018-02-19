'use strict';

import { PLAY_STATUS, PAUSE_STATUS, LOADING_STATUS, secondsToHms } from './common';
import requestMusic from './binaryClient';

function moveQueue(that, flag) {
  if(that.queue === null) { console.error('NO QUEUE'); return; }
  var queue = that.queue;

  var ql = queue.length,
    index = that.currentTrack + flag;
  that.currentTrack = (index===ql) ? index-ql : (index===-1) ? index+ql : index;

  var music = queue[that.currentTrack];
  that.title = music.title;
  requestMusic(music.file, that);
}

function updatePlayTime(that) {
  var current = that.audioCtx.currentTime,
    duration = that.audioCtx.duration;

  that.current = secondsToHms(current);
  that.remain = secondsToHms(duration - current);
  that.timeGauge = current / duration * 100;
}

const statusHandler = {
  play: that => {
    that.audioCtx.play();
    that.playStatus = PAUSE_STATUS;
  },
  pause: that => {
    that.audioCtx.pause();
    that.playStatus = PLAY_STATUS;
  }
};

var interval = null;
var guageBarWidth = null;

export var playCtrl = {
  mounted() {
    guageBarWidth = this.$refs.guageBar.clientWidth;
  },
  data: {
    playStatus: PLAY_STATUS,
    current: secondsToHms(0),
    remain: secondsToHms(0),
    timeGauge: 0,

    albumArt: '',
    title: '',
    artist: '',
    album: '',

    queue: null,
    currentTrack: -1,
  },
  watch: {
    playStatus(newStatus) {
      if(this.audioCtx.paused) {
        clearInterval(interval);
      } else {
        interval = setInterval(() => {
          if(this.audioCtx.ended && newStatus !== LOADING_STATUS) {
            clearInterval(interval);
            this.playNext();
          } else {
            updatePlayTime(this);
          }
        }, 30);
      }
    },
  },
  methods: {
    move($event) {
      if(this.audioCtx.src === '') { return; }

      this.audioCtx.currentTime = this.audioCtx.duration * ($event.pageX / guageBarWidth);
      updatePlayTime(this);
    },
    playOrPause() {
      let handler = statusHandler[this.playStatus];
      if(handler !== undefined && this.audioCtx.src !== '') { handler(this); }
    },
    playPrevious() {
      if(this.audioCtx.currentTime > 10) {
        this.audioCtx.currentTime = 0;
        updatePlayTime(this);
      } else {
        moveQueue(this, -1);
      }
    },
    playNext() {
      moveQueue(this, 1);
    },
  }
};
