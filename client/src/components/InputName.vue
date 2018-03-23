<template>
  <div class="card text-center">
    <div class="card-header">
      <marquee direction="right">
        <img src="https://image.flaticon.com/icons/svg/296/296216.svg" alt="">
      </marquee>
    </div>
    <div class="card-body">
      <h1 class="card-title">Typo-Racer</h1>
      <p class="card-text">Masukkan nama Anda</p>
      <input id="form-nama" type="text" class="form"><br><br>
      <router-link :to="{path: '/room'}">
        <button @click="setName" class="btn btn-dark">Mulai</button>
      </router-link>
    </div>
    <div class="card-footer text-muted">
      <marquee direction="left">
        <img src="https://image.flaticon.com/icons/png/512/618/618965.png" alt="">
      </marquee>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InputNama',
  methods: {
    setName () {
      this.$store.commit('setPlayerName', document.querySelector('#form-nama').value)
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
