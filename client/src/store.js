import Vue from 'vue'
import Vuex from 'vuex'
import typeRacer from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    winner: 'MENANG',
    array: []
  },
  getters: {
    jawaban: (state) => (id) => {
      return state.array[id]
    },
    winner: (state) => {
      return state.winner
    }
  },
  mutations: {
    getQuestion: function (state, payload) {
      state.array = payload.question.map(val => val)
    }
  },
  actions: {
    getQuestion: function (context) {
      let counter = 0
      let questions = []
      let totalBankSoal = 0
      let wordChoosen = ''

      console.log('masuk actions')

      typeRacer.child('BankSoal').once('value')
        .then(snapshot => {
          totalBankSoal = snapshot.numChildren()
          console.log(`Total Bank Soal ${totalBankSoal}`)
          // while (counter < 10) {
          //   let indexRandom = Math.floor(Math.random() * totalBankSoal)
          //   wordChoosen = snapshot.child(indexRandom).val()
          //   while (questions.indexOf(wordChoosen) !== -1) {
          //     indexRandom = Math.floor(Math.random() * totalBankSoal)
          //     wordChoosen = snapshot.child(indexRandom).val()
          //   }
          //   questions.push(wordChoosen)
          //   counter++
          // }
          console.log('ini questions')
          console.log(questions)
          context.commit('getQuestion', {
            question: questions
          })
        })
    }
  }
})
