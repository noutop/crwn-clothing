import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBk-vREur1IS2jXWVYNLploeDiH8w_Fbcw",
  authDomain: "crwn-db-95914.firebaseapp.com",
  projectId: "crwn-db-95914",
  storageBucket: "crwn-db-95914.appspot.com",
  messagingSenderId: "20383239393",
  appId: "1:20383239393:web:55f28258ebc58fda29fba0",
  measurementId: "G-661YW2ZXE0"
};

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const firestore = getFirestore(app)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => signInWithPopup(auth, provider)



