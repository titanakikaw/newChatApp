import React, { useContext } from "react";
import { AuthContext } from "../context/auth";

function useAuth(){
   const value = useContext(AuthContext);
   if(!value) {
      throw new Error("Auth Context undefined value");
   }
   return value
}


export { useAuth };