<template>
  <div>
    <div class="jumbotron" v-show=!isWinner >
      <h2>{{count+1}}</h2>
      <hr class="my-4">
      <h3 class="display-4">{{jawaban(count)}}</h3>
      <input id="inputketik" type = 'text' v-model='ketikan' v-on:keyup='keymonitor' v-focus>
      <button @click=answer ref= 'myBtn'>jawab</button>
    </div>
    <div class = 'jumbotron' v-show=isWinner>
      <h1>KAMU {{winner}}</h1>
    </div>
    <Form></Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '@/components/Form'
// import { link } from 'fs'

export default {
  data () {
    return {
      count: 0,
      ketikan: '',
      isWinner: false
    }
  },
  methods: {
    answer ($event) {
      if (this.ketikan === this.jawaban(this.count)) {
        this.count++
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
      this.isWinner = true
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
    ])
  },
  directives: {
    focus: {
      // directive definition
      inserted: function (el) {
        el.focus()
      }
    }
  }
}
</script>
