<template>
  <div>
    <div class="jumbotron" v-show="isWinner==null" >
      <h2>{{count+1}}</h2>
      <hr class="my-4">
      <h3 class="display-4">{{jawaban(count)}}</h3>
    </div>
    <div id="menang" class = 'jumbotron' v-show="isWinner == 'win'">
      <h1>KAMU MENANG!</h1>
    </div>
    <div class = 'jumbotron' v-show="isWinner == 'lost'">
      <h1>KAMU CUPU!</h1>
      <h3>Pemenangnya: {{winner}}</h3>
    </div>
    <div class="container" v-show="!isWinner">
      <div class="form-group">
        <label for="Jawaban"><strong>Jawaban</strong></label>
        <input class="form-control" id="inputketik" type = 'text' v-model='ketikan' v-on:keyup='keymonitor' v-focus placeholder="Ketik di Sini">
      </div>
      <button @click=answer ref= 'myBtn' class="btn btn-dark">Kumpulkan</button>
    </div>
    <div id="kalah" class = 'jumbotron' v-show="isWinner == 'lost'">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '@/components/Form'
import typeRacer from '../firebase'
// import { link } from 'fs'

export default {
  data () {
    return {
      count: 0,
      ketikan: '',
      isWinner: null,
      winner: '',
      players: []
    }
  },
  methods: {
    destroyRoom () {
      this.$store.dispatch('removeRoom')
    },
    answer ($event) {
      if (this.ketikan === this.jawaban(this.count)) {
        this.count++
        this.$store.dispatch('updateScore')
        this.ketikan = ''
      } else {
        this.ketikan = ''
      }
    },
    keymonitor: function (event) {
      if (event.key === 'Enter') {
        this.answer()
      }
    },
    menang () {
      this.$store.dispatch('setWinner')
      // this.isWinner = true
    }
  },
  components: {
    Form
  },
  watch: {
    count () {
      if (this.count > 9) {
        this.menang()
      }
    }
  },
  computed: {
    ...mapGetters([
      'jawaban',
      'winner'
    ]),
    score () {
      return this.$store.state.score
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  },
  created: function () {
    // console.log('ini '+typeRacer.child(`Room/${this.$store.state.roomName}/winner`).val())
    this.$store.dispatch('getScore')
    let playerList = []
    typeRacer.child(`Room/${this.$store.state.roomName}/player`).once('value', snapshot => {
      snapshot.forEach(el => {
        playerList.push(el.key)
      })
      console.log(playerList)
      playerList.forEach(player => {
        typeRacer.child(`Room/${this.$store.state.roomName}/player/${player}`).on('child_changed', snapshotScore => {
          let obj = {
            name: player,
            score: snapshotScore.val()
          }
          this.players.push(obj)
          console.log(this.players)
        })
      })
    })

    typeRacer.child(`Room/${this.$store.state.roomName}/winner`).on('value', (snapshot) => {
      console.log(`ini snapshot ${snapshot.val()}`)
      console.log(snapshot.val())
      if (snapshot.val() === this.$store.state.playerName) {
        this.isWinner = 'win'
      } else if (snapshot.val() === '') {
        this.isWinner = null
      } else {
        this.winner = snapshot.val()
        this.isWinner = 'lost'
      }
    })
  }
}
</script>

<style>
#menang {
  color: white;
  text-shadow: 2px 2px 4px black;
  background: url(https://thumbs.gfycat.com/CloseAncientDorado-size_restricted.gif)
}
#kalah {
  color: white;
  text-shadow: 2px 2px 4px black;
  background: url(https://im-01.gifer.com/FQ5Q.gif);
  height: 50rem
}
</style>
