import firebase from 'firebase'

// Initialize Firebase
let config = {
  databaseURL: 'https://type-racer-cd507.firebaseio.com/',
  projectId: 'type-racer-cd507'
}

let app = firebase.initializeApp(config)
let db = app.database()
const typeRacer = db.ref('type_racer')

export default typeRacer
