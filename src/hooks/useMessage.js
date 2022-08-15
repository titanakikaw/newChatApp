import { serverTimestamp, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { sendMessage, getMessages } from '../services/firebase'

function Send(text, roomid, user){
   const message = {
      text,
      sentBy : user,
      sentAt : serverTimestamp()
   }

   if(message.text != ''){
      sendMessage(roomid, message)
   }
}





export { Send };