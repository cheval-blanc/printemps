<template>
  <div class="volume-bar">
    <icon-button
      class="volume-handle"
      iconName="circle"
      :iconSize="iconSize"
      :style="{ top: halfIconSize + 1, left: halfIconSize }"
    />
  </div>
</template>

<script>
import IconButton from './IconButton';

export default {
  components: {
    IconButton,
  },
  data: ()=>({
    iconSize: 15,
  }),
  computed: {
    halfIconSize() {
      return this.iconSize / 2 * -1;
    },
  }
}
</script>

<style lang="scss" scoped>
.volume-bar {
  position: relative;
  width: 80px;
  height: 2px;
  background-color: #B9B9B9;
  cursor: pointer;
}

.volume-handle {
  position: absolute;
}
</style>
