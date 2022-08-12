import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getFirestore, onSnapshot, serverTimestamp, query, orderBy, doc, setDoc } from 'firebase/firestore'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
   apiKey: "AIzaSyDh8q7Wm8rbxzop0P3M4XmGTmsXBIHZVZ8",
   authDomain: "chatappupgrade.firebaseapp.com",
   projectId: "chatappupgrade",
   storageBucket: "chatappupgrade.appspot.com",
   messagingSenderId: "370451540763",
   appId: "1:370451540763:web:9571a6fc185366b449c1be",
   measurementId: "G-QBVBCHQEVE"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

async function loginWithGoogle() {
   try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();
      const { user } = await signInWithPopup(auth, provider);
      return { user }
   } catch (error) {
      console.log(error)
      return null
   }
}


async function createGroup(){
   try {
      const docRef = await addDoc(collection(db, 'groups'), {
         createAt : serverTimestamp(),
         lastUpdate : serverTimestamp(),
         name : "samples",
         member : {
            0 : "tn9UpCBae5ZnisVlLcWsEE3pDxD2"        
         },
         messageId : '223456'
      })
      .then((docRef) => {
         sendMessage(docRef.id)
      })
   } catch (error) {
      console.log(error)
   }
}


async function sendMessage(id, data){
   try{
      await addDoc(collection(db, 'messages', id, 'messages'), data)
   }catch(error){
      console.log(error)
   }
}




async function getGroups(callback){
   return  onSnapshot(
      query(
         collection(db, 'groups'),
         orderBy('lastUpdate', 'asc')
      ),
      (querySnapshot) => {
         const groups = querySnapshot.docs.map((doc) => ({
            id : doc.id,
            ...doc.data()
         }))

         callback(groups)
      }
   )
}

export { loginWithGoogle, getGroups,  createGroup, sendMessage }



