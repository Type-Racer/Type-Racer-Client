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
      <input id="room-name" type="text" class="form"><br><br>
        <button @click="startGame" class="btn btn-dark" type="button" name="button">
          Mulai
        </button>
      <hr>
      <ul v-for="(room, i) in rooms" :key="i">
        <li>{{room}} <button class="btn btn-success" @click="joinGame(room)">Join</button></li>
      </ul>
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
      this.$store.commit('')
      this.$store.dispatch('createRoom', document.querySelector('#room-name').value)
      this.$store.dispatch('getQuestion')
      console.log('ini data di home')
      console.log(this.$store.state.array)
      this.$router.push({name: 'Game Room', params: {id: this.$store.state.roomName}})
    },
    joinGame: function (roomName) {
      // console.log(roomName)
      this.$store.dispatch('joinRoom', roomName)
      this.$store.dispatch('getLocalQuestion', roomName)
      this.$router.push({name: 'Game Room', params: {id: roomName}})
    }
  },
  created () {
    console.log('created')
    this.$store.dispatch('getRoom')
  },
  computed: {
    rooms () {
      return this.$store.state.rooms
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
