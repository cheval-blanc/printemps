'use strict';

var barWidth = null,
  barMin = null,
  circleRadius = null;

function setVolumeData(bar, circle) {
  barWidth = bar.clientWidth;
  barMin = bar.offsetLeft;
  circleRadius = circle.clientWidth * 1.2 / 2;
}

var volumeDragging = false;

var volumeCtrl = {
  mounted() {
    let refs = this.$refs;
    setVolumeData(refs.volumeBar, refs.circle);
    this.circlePos = circleRadius * -1;
  },
  data: {
    circlePos: 0,
    volumeScale: 'up',
  },
  methods: {
    updateVolume(pageX, _ratio) {
      var ratio = 0;
      if(_ratio !== undefined) {
        ratio = _ratio;
      } else {
        ratio = (pageX - barMin) / barWidth;
        ratio = (ratio > 1) ? 1 : (ratio < 0) ? 0 : ratio;
      }

      var pos = ratio * barWidth - (barWidth + circleRadius);
      this.circlePos = pos;

      this.audioCtx.volume = ratio;
      if(this.audioCtx.muted) { this.audioCtx.muted = false; }
      this.volumeScale = (ratio === 0) ? 'off' : (ratio > 0.5) ? 'up' : 'down';
    },

    mute() {
      this.audioCtx.muted = !this.audioCtx.muted;
      if(this.audioCtx.muted) { this.volumeScale = 'off'; }
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
