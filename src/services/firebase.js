import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { addDoc, collection, getFirestore, onSnapshot, serverTimestamp, query, orderBy, getDocs, where, getDoc, getDocsFromCache} from 'firebase/firestore'
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

async function createGroup(groupName, members){
   try {
      const docRef = await addDoc(collection(db, 'groups'), {
         createAt : serverTimestamp(),
         lastUpdate : serverTimestamp(),
         name : groupName,
         members : members,
      })
   } catch (error) {
      console.log(error)
   }
}

async function sendMessage(groupId, data){

   try{
      await addDoc(collection(db, 'messages', groupId, 'message'), data)
   }catch(error){
      console.log(error)
   }
}

async function getMessages(roomId, callback){
   return onSnapshot(
      query(
         collection(db, 'messages', roomId, 'message'),
         orderBy('sentAt', 'asc')
      ),
      (querySnapshot) => {
         const message = querySnapshot.docs.map((msg) =>({
            id : msg.id,
            ...msg.data()
         }))
         callback(message)
      }
   )
}

async function getGroups(uid,callback){
   return  onSnapshot(
      query(
         collection(db, 'groups'),where("members", "array-contains", uid),
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

async function createUser(email, password){
   try {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
         const user = userCredentials;

      })
      .catch((error) => {
         const errorCode = error.code;
         const errorMessage = error.message;
      })

   } catch (error) {
      console.log(error)
   }
}

async function signInWithCredentials(email, password){
   try {
      const auth = getAuth();
      const { user } = await signInWithEmailAndPassword(auth, email, password)
      return user
   } catch (error) {
      console.log(error)
   }

}

async function getUsers(){
   const { docs } = await getDocs(collection(db, 'users'))
   const users = docs.map((doc) => ({
      id : doc.id,
      ...doc.data()
   }))
   return users
}

async function getRoom(roomId, callback){
   
   const { docs } = await getDocs(collection(db, "groups"),where("name", "===", "test"));
   const data = docs.map((doc) => ({
      id : doc.id,
      ...doc.data()
   }))
   callback(data)
   
}

async function addUser(params){
   try {
      const docRef = await addDoc(collection(db, 'users'), params)
   } catch (error) {
      console.log(error)
   }
}


export { loginWithGoogle, getGroups,  createGroup, sendMessage, getMessages, createUser, signInWithCredentials, addUser, getUsers, getRoom }



