import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore'

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
  // const collectionRef = collection(firestore, 'users')

  const docSnap = await getDoc(userRef)
  // const collectionSnapshot = await getDocs(collectionRef)
  // console.log({ collection: collectionSnapshot.docs.map(doc => doc.data()) })

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

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey)

  const batch = writeBatch(firestore)

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef)
    batch.set(newDocRef, obj)
  })

  return await batch.commit()
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const tranformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  return tranformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)

export const firestore = getFirestore(app)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({ prompt: 'select_account' })

export const signInWithGoogle = () => signInWithPopup(auth, provider)



