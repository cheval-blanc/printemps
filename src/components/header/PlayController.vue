<template>
  <div class="play-controller">
    <icon-button class="play-icon" iconName="backward" :iconSize="iconSize" />
    <icon-button class="play-icon" iconName="play" :iconSize="iconSize" />
    <icon-button class="play-icon" iconName="forward" :iconSize="iconSize" />
  </div>
</template>

<script>
import IconButton from './IconButton';

export default {
  components: {
    IconButton,
  },
  data: ()=>({
    iconSize: '2.5em',
  }),
}
</script>

<style lang="scss" scoped>
@import '../../scss/variables';

.play-icon {
  margin: 0 $md-pad;
}
</style>
