'use strict';

let barWidth = null,
  barMin = null,
  circleRadius = null;

function setVolumeData(bar, circle) {
  barWidth = bar.clientWidth;
  barMin = bar.offsetLeft;
  circleRadius = circle.clientWidth * 1.2 / 2;
}

const VOLUME_OFF = 'off';
const VOLUME_DOWN = 'down';
const VOLUME_UP = 'up';

let volumeDragging = false;

export let volumeCtrl = {
  mounted() {
    let refs = this.$refs;
    setVolumeData(refs.volumeBar, refs.circle);
    this.circlePos = circleRadius * -1;
  },
  data: {
    circlePos: 0,
    volumeScale: VOLUME_UP,
  },
  methods: {
    updateVolume(pageX, _ratio) {
      let ratio = 0;
      if(_ratio !== undefined) {
        ratio = _ratio;
      } else {
        ratio = (pageX - barMin) / barWidth;
        ratio = (ratio > 1) ? 1 : (ratio < 0) ? 0 : ratio;
      }

      let pos = ratio * barWidth - (barWidth + circleRadius);
      this.circlePos = pos;

      this.audioCtx.volume = ratio;
      if(this.audioCtx.muted) { this.audioCtx.muted = false; }
      this.volumeScale = (ratio === 0) ? VOLUME_OFF : (ratio > 0.5) ? VOLUME_UP : VOLUME_DOWN;
    },

    mute() {
      this.audioCtx.muted = !this.audioCtx.muted;
      if(this.audioCtx.muted) { this.volumeScale = VOLUME_OFF; }
      else { this.updateVolume(0, this.audioCtx.volume); }
    },
    clickVolumeBar($event) {
      this.updateVolume($event.pageX);
    },
    mDownVolume($event) {
      volumeDragging = true;
      this.updateVolume($event.pageX);
    },
    mMoveVolume($event) {
      if(volumeDragging) { this.updateVolume($event.pageX); }
    },
    mUpVolume($event) {
      if(volumeDragging) {
        volumeDragging = false;
        this.updateVolume($event.pageX);
      }
    },
  }
};
