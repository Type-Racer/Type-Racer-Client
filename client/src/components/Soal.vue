<template>
  <div>
    <div class="jumbotron">
      <h2>{{count}}</h2>
      <hr class="my-4">
      <h3 class="display-4">{{kacang(count)}}</h3>
      <input type = 'text' v-model='ketikan'>
      <button @click=answer>jawab</button>
    </div>
    <Form></Form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Form from '@/components/Form'

export default {
  data () {
    return {
      count: 1,
      ketikan: ''
    }
  },
  methods: {
    answer () {
      if (this.ketikan === this.kacang(this.count)) {
        this.count++
      }
    }
  },
  components: {
    Form
  },
  computed: {
    ...mapGetters([
      'groups',
      'jawaban',
      'kacang'
    ])
  }
}
</script>
