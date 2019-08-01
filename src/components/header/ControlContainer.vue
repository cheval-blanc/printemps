<template>
  <div class="control-container">
    <play-controller />
    <volume-controller />
  </div>
</template>

<script>
import PlayController from './PlayController';
import VolumeController from './VolumeController';

export default {
  components: {
    PlayController,
    VolumeController,
  },
}
</script>

<style lang="scss" scoped>
@import '../../scss/mixins';

.control-container {
  @include flex-vertical-align();
  flex: initial;
  width: 380px;
  min-width: 340px;
}
</style>
