<template>
  <div class="card text-center">
    <div class="card-header">
      <marquee direction="right">
        <img src="https://image.flaticon.com/icons/svg/296/296216.svg" alt="">
      </marquee>
    </div>
    <div class="card-body">
      <h1 class="card-title">Typo-Racer</h1>
      <p class="card-text">Masukkan nama room, lalu ketik mulai</p>
      <input type="text" class="form"><br><br>
      <router-link :to="{path: '/start/'+id}" href="#" class="btn btn-dark">Mulai</router-link>
    </div>
    <div class="card-footer text-muted">
      <marquee direction="right">
        <img src="https://image.flaticon.com/icons/svg/296/296208.svg" alt="">
      </marquee>
    </div>
  </div>
</template>

<style>
.card {
  font-family:monospace;
  font-size: 14px;
}
img{
  height: 100px;
}
</style>
