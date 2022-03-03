import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBk-vREur1IS2jXWVYNLploeDiH8w_Fbcw",
  authDomain: "crwn-db-95914.firebaseapp.com",
  projectId: "crwn-db-95914",
  storageBucket: "crwn-db-95914.appspot.com",
  messagingSenderId: "20383239393",
  appId: "1:20383239393:web:55f28258ebc58fda29fba0",
  measurementId: "G-661YW2ZXE0"
};

export const createUserProfile = async (userAuth, additionalData) => {
  if (!userAuth) return

  const userRef = doc(firestore, 'users', `${userAuth.uid}`)
  const docSnap = await getDoc(userRef)

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('Error creating user', error.message)
    }
  }

  return userRef
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const firestore = getFirestore(app)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => signInWithPopup(auth, provider)



