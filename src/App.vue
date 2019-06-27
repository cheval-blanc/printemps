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

body {
  font-family: 'Lora', 'Jeju Myeongjo', serif;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
