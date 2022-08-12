import { serverTimestamp, } from "firebase/firestore";
import React, { useContext } from "react";
import { sendMessage } from '../services/firebase'
import { AuthContext } from '../context/auth'

function Send(text){
   const { user } = useContext(AuthContext)
   console.log(user)
   // const message = {
   //    text : text,
   //    sentBy : user.displayName,
   //    sentAt : serverTimestamp()
   // }
   // if(message.text != ''){
   //    sendMessage('yftnDl2lMK1AzmDPSHDy', message)
   // }
}


export { Send };