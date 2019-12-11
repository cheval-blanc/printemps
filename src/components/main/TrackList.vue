<template>
  <ul class="track-list">
    <li
      v-for="t in tracks"
      :key="t._id"
      class="track"
      @dblclick="$emit('fetchQueue', t.trackNumber)"
    >
      <div class="track-number">{{ t.trackNumber }}</div>
      <div class="track-title">{{ t.title }}</div>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    tracks: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../scss/variables';
@import '../../scss/mixins';

.track-list {
  @include custom-scroll();
  overflow-y: overlay;
  padding: 0 $sm-pad 4px;
  flex: 1;

  .track {
    @include flex-vertical-align();
    margin-bottom: 3px;
    cursor: pointer;

    &:hover .track-title {
      font-weight: 600;
    }

    .track-number {
      flex: none;
      width: 16px;
      margin-right: 4px;
      text-align: center;
      font-size: 1.1rem;
      color: $primary-color;
    }

    .track-title {
      @include text-overflow-ellipsis();
      flex: 1;
      font-size: 1.35rem;
      color: $bold-color;
    }
  }
}
</style>
