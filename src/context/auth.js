import React, { createContext, useState } from "react";

import { loginWithGoogle, signInWithCredentials } from "../services/firebase";

const AuthContext = createContext();

const AuthProvider = (props) => {

   const [user, setUser] = useState();

   const login = async() => {
      const user = await loginWithGoogle();
      if(!user){
         console.log("Failed to login")
      }
      setUser(user)
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
   
   const value = { user, login, loginWithCredentials }
   return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>

}

export { AuthContext, AuthProvider }