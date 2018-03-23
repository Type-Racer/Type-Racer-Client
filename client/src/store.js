import Vue from 'vue'
import Vuex from 'vuex'
import typeRacer from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playerName: '',
    roomName: '',
    winner: 'MENANG',
    array: [],
    rooms: []
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
    },
    setPlayerName (state, name) {
      state.playerName = name
    },
    setRoom (state, name) {
      state.roomName = name
    },
    getRoom (state, rooms) {
      state.rooms = rooms
    }
  },
  actions: {
    createRoom: function ({ state, commit }, roomName) {
      console.log('cr room')
      let obj = {}
      obj[state.playerName] = {
        score: 0
      }
      typeRacer.child('Room/' + roomName).set({
        player: obj,
        status: false,
        counter: 0
      })
      commit('setRoom', roomName)
    },
    joinRoom ({ state, commit }, roomName) {
      console.log(roomName)
      let obj = {}
      obj[state.playerName] = {
        score: 0
      }
      typeRacer.child('Room/' + roomName + '/player').update(obj)
      typeRacer.child('Room/' + roomName).update({ status: true })
      commit('setRoom', roomName)
    },
    getRoom: function ({ commit }) {
      typeRacer.child('Room').on('value', snapshot => {
        let childs = []
        snapshot.forEach(el => {
          childs.push(el.key)
        })
        commit('getRoom', childs)
      })
    }
  // getQuestion: function (context) {
    // let counter = 0
    // let questions = []
    // let totalBankSoal = 0
    // let wordChoosen = ''

    // console.log('masuk actions')

    // typeRacer.child('BankSoal').once('value')
    //   .then(snapshot => {
    //     totalBankSoal = snapshot.numChildren()
    //     console.log(`Total Bank Soal ${totalBankSoal}`)
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
    //   console.log('ini questions')
    //   console.log(questions)
    //   context.commit('getQuestion', {
    //     question: questions
    //   })
    // })
  // }
  }
})
