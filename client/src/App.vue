<template>
  <div id="app">
    <router-view :kumpulanSoal="kumpulanSoal"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      kumpulanSoal: [{
        id: 1,
        kata: 'satu'
      }, {
        id: 2,
        kata: 'dua'
      }, {
        id: 3,
        kata: 'tiga'
      }]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
