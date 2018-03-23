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
    rooms: [],
    score: 0
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
      state.array = payload.map(val => val)
    },
    setPlayerName (state, name) {
      state.playerName = name
    },
    setRoom (state, name) {
      state.roomName = name
    },
    getRoom (state, rooms) {
      state.rooms = rooms
    },
    getLocalQuestion (state, question) {
      state.array = question.map(val => val)
    },
    setScore (state, score) {
      state.score = score
    },
    updateScore (state) {
      state.score++
    }
  },
  actions: {
    createRoom: function ({
      state,
      commit
    }, roomName) {
      console.log('cr room')
      let obj = {}
      obj[state.playerName] = {
        score: 0
      }
      typeRacer.child('Room/' + roomName).set({
        player: obj,
        status: false,
        counter: 0,
        winner: ''
      })
      commit('setRoom', roomName)
    },
    joinRoom ({
      state,
      commit
    }, roomName) {
      console.log(roomName)
      let obj = {}
      obj[state.playerName] = {
        score: 0
      }
      typeRacer.child('Room/' + roomName + '/player').update(obj)
      typeRacer.child('Room/' + roomName).update({
        status: true
      })
      commit('setRoom', roomName)
    },
    getRoom: function ({
      commit
    }) {
      typeRacer.child('Room').on('value', snapshot => {
        let childs = []
        snapshot.forEach(el => {
          childs.push(el.key)
        })
        commit('getRoom', childs)
      })
    },
    getScore: function ({ state, commit }) {
      typeRacer.child('Room/' + state.roomName + '/player/' + state.playerName).on('value', snapshot => {
        console.log(snapshot.val())
        commit('setScore', snapshot.val().score)
        // let childs = []
        // snapshot.forEach(el => {
        //   childs.push(el.key)
        // })
        // commit('getRoom', childs)
      })
    },
    getQuestion: function (context) {
      let counter = 0
      let questions = []
      let questionObject = {}
      let totalBankSoal = 0
      let wordChoosen = ''

      typeRacer.child('BankSoal').once('value')
        .then(snapshot => {
          totalBankSoal = snapshot.numChildren()
          console.log(`Total Bank Soal ${totalBankSoal}`)
          while (counter < 10) {
            let indexRandom = Math.floor(Math.random() * totalBankSoal)
            wordChoosen = snapshot.child(indexRandom).val()
            while (questions.indexOf(wordChoosen) !== -1) {
              indexRandom = Math.floor(Math.random() * totalBankSoal)
              wordChoosen = snapshot.child(indexRandom).val()
            }
            questions.push(wordChoosen)
            questionObject[counter] = wordChoosen
            counter++
          }
          console.log('ini questions')
          console.log(questions)
          console.log(questionObject)
          typeRacer.child(`Room/${context.state.roomName}/Soal`).set(questionObject)

          context.commit('getQuestion', questions)
        })
    },
    getLocalQuestion: function (context, name) {
      typeRacer.child(`Room/${name}/Soal`).once('value')
        .then(snapshot => {
          let question = []
          snapshot.forEach(el => {
            question.push(el.val())
          })
          context.commit('getLocalQuestion', question)
        })
    },
    updateScore: function ({ state, commit }) {
      commit('updateScore')
      typeRacer.child(`Room/${state.roomName}/player/${state.playerName}/score`).set(state.score)
    },
    setWinner: function (context) {
      typeRacer.child(`Room/${this.$store.state.roomName}/winner`).set(true)
    }
  }
})
