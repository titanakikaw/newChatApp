import React, { createContext, useState } from "react";

import { loginWithGoogle } from "../services/firebase";

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

   const value = { user, login }

   return <AuthContext.Provider value={value} {...props}></AuthContext.Provider>

}

export { AuthContext, AuthProvider }