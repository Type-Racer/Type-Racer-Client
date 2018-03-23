import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    winner: 'MENANG',
    array: ['sate', 'burger', 'spaghetti', 'ayam bakar', 'tahu gejrot', 'empal gentong', 'makaroni ngehe', 'soto paru', 'bika ambon', 'nasi padang', 'gehu panas renyah lagi pedas']
  },
  getters: {
    jawaban: (state) => (id) => {
      return state.array[id]
    },
    winner: (state) => {
      return state.winner
    }
  },
  actions: {
  }
})
