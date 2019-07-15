<template>
  <div id="app">
    <masthead />
    <card-container />
  </div>
</template>

<script>
import Masthead from './components/header/Masthead.vue';
import CardContainer from './components/main/CardContainer.vue';

export default {
  components: {
    Masthead,
    CardContainer,
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lora');
@import url('http://fonts.googleapis.com/earlyaccess/jejumyeongjo.css');

html {
  overflow: auto;

  p {
    margin: 0;
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
}

body {
  font-family: 'Lora', 'Jeju Myeongjo', serif;

  #app {
    width: 100%;
    height: 100%;

    & > * { user-select: none; }
  }
}
</style>
