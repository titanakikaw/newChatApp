import { serverTimestamp, } from "firebase/firestore";
import { useEffect, useState } from "react";
import { sendMessage, getMessages, lastUpdate1 } from '../services/firebase'


function Send(text, roomid, user){
   const message = {
      text,
      sentBy : user,
      sentAt : serverTimestamp()
   }
   if(message.text != ''){
      sendMessage(roomid, message)
      lastUpdate1(roomid, text)
   }
}

export { Send };