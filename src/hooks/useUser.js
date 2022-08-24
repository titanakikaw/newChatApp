import { addUser, getUsers } from '../services/firebase';

function validateExist(user){
   const { reloadUserInfo } = user;
   // getUsers(getUsers
}


function createUser(user){
   const { reloadUserInfo } = user;
   const newUser = {
      localId : reloadUserInfo.localId,
      displayName : reloadUserInfo.displayName,
      email : reloadUserInfo.email,
      photoUrl : reloadUserInfo.photoUrl,
   }
   addUser(newUser)
}

export { createUser }