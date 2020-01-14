<template>
  <div class="content-wrapper">
    <control-container />
    <info-container />
    <action-container />
  </div>
</template>

<script>
import ControlContainer from './ControlContainer.vue';
import InfoContainer from './InfoContainer.vue';
import ActionContainer from './ActionContainer.vue';

export default {
  components: {
    ControlContainer,
    InfoContainer,
    ActionContainer,
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/variables';

.content-wrapper {
  width: auto;
  height: $masthead-height - $progress-bar-height;
  padding: 0 25px;
  display: flex;
}
</style>
