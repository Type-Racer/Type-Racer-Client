<template>
  <div class="card text-center">
    <div class="card-header">
      <marquee direction="left">
        <img src="https://image.flaticon.com/icons/png/512/618/618965.png" alt="">
      </marquee>
    </div>
    <div class="card-body">
      <h1 class="card-title">Typo-Racer</h1>
      <p class="card-text">Masukkan nama room, lalu ketik mulai</p>
      <input type="text" class="form"><br><br>
      <router-link :to="{path: '/start/'+id}">
        <button @click="startGame" class="btn btn-dark" type="button" name="button">
          Mulai
        </button>
      </router-link>
    </div>
    <div class="card-footer text-muted">
      <marquee direction="right">
        <img src="https://image.flaticon.com/icons/svg/296/296216.svg" alt="">
      </marquee>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame: function () {
      this.$store.dispatch('getQuestion')
      console.log('ini data di home')
      console.log(this.$store.state.array)
    }
  }
}
</script>

<style>
.card {
  font-family:monospace;
  font-size: 14px;
}
img{
  height: 100px;
}
</style>
