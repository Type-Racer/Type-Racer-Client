import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    groups: [
      {
        name: '1'
      },
      {
        name: '2'
      }
    ]
  },
  getters: {
    groups: function () {
      return this.state.groups
    }
  }
})
