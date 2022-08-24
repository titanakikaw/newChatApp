import React, { createContext, useState } from "react";
import { createUser } from "../hooks/useUser";

import { loginWithGoogle, signInWithCredentials, getUsers } from "../services/firebase";

const AuthContext = createContext();

const AuthProvider = (props) => {

   const [user, setUser] = useState();
   const [users, setUsers] = useState();

   const login = async() => {
      const { user } = await loginWithGoogle();
      const promiseMembers = await getUsers()
      if(!user){
         console.log("Failed to login")
      }
      setUser(user)
      setUsers(promiseMembers)
      
      let exist = false;
      promiseMembers.map((mem) => {
         if(mem.id === user.uid){
            exist = true;
         }
      })
      if(exist){
         createUser(user)
      }
   }

   const loginWithCredentials = async (credentials) => {

      const email = credentials.email
      const password = credentials.pass

      const user = await signInWithCredentials(email,password);
      if(!user){
         console.log("Failed to login")
      }
      setUser(user)
   }
   
   const value = { user ,users , login, loginWithCredentials }
   return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>

}

export { AuthContext, AuthProvider }