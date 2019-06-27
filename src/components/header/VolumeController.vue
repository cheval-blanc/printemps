<template>
  <div class="volume-controller">
    <icon-button
      class="mute-button"
      :iconName="`volume-${volumeStatus}`"
      :iconSize="volumeSize"
      :style="{ width: volumeSize + 3 }"
    />
    <volume-slider />
  </div>
</template>

<script>
import IconButton from './IconButton.vue';
import VolumeSlider from './VolumeSlider.vue';

export default {
  components: {
    IconButton,
    VolumeSlider,
  },
  data: ()=>({
    volumeStatus: 'up', // ['mute', 'off', 'down', 'up']
    volumeSize: 20,
  }),
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.volume-controller {
  @include flex-vertical-align();
  margin-left: 30px;

  .mute-button {
    margin-right: $lg-pad;
  }
}
</style>
