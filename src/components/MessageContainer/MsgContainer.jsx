import React, { useEffect, useState } from 'react'
import { AppBar,Toolbar,Typography, Box, Divider,List } from '@mui/material'
import MsgInput from '../MessageInput/MsgInput'
import Message from '../Message/Message'

import { useParams } from 'react-router-dom'
import { getMessages } from '../../services/firebase'


const MsgContainer = () => {
  const { roomId } = useParams()
  const [messages, setMessages ] = useState();
  const [chat, setChat] = useState();

  useEffect(() => {
    getMessages(roomId, setMessages)
  }, [roomId])

  return (
    <Box component="main" style={{width: '100%',height:'650px', overflowY:'hidden'}}>
      <AppBar position="static">
        <Toolbar variant="dense"> 
          <Typography variant="h6" color="inherit" component="div">
            Rooms
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{padding: '0 1rem',height:'520px', overflowY:'scroll'}}>
        {
         
          messages ? messages.map((msg) => {
            return  <Message msgDetail={msg} key={msg.id}/>
          }) : 'Loading . . .'
        }

       
      </List>
      <Divider/>
      <MsgInput/>
    </Box>
  )
}

export default MsgContainer