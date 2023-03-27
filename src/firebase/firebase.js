import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/database'
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBO2P5uz5BoDTkOREBv5GeaBWu5PkD4GXc",
    authDomain: "whatsapp-firebase-35dd8.firebaseapp.com",
    projectId: "whatsapp-firebase-35dd8",
    storageBucket: "whatsapp-firebase-35dd8.appspot.com",
    messagingSenderId: "209688962185",
    appId: "1:209688962185:web:023ec376a1e36f78fb1258"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth,provider}
export default db