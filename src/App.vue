<template>
  <v-app
    @mousemove.native="$root.$emit('mMoveVolume', $event)"
    @mouseup.native="$root.$emit('mUpVolume')"
  >
    <masthead />
    <card-container />
    <throbber-icon />
  </v-app>
</template>

<script>
import Masthead from './components/header/Masthead.vue';
import CardContainer from './components/main/CardContainer.vue';
import ThrobberIcon from './components/ThrobberIcon.vue';

export default {
  components: {
    Masthead,
    CardContainer,
    ThrobberIcon,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lora');
@import url('http://fonts.googleapis.com/earlyaccess/jejumyeongjo.css');

html {
  overflow: auto;
  font-size: 10px;
}

.v-application {
  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

#app {
  font-family: 'Lora', 'Jeju Myeongjo', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  width: 100%;
  height: 100%;

  & > * {
    user-select: none;
  }
}
</style>
