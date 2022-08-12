import React from 'react'
import { AppBar,Toolbar,Typography, Box, Divider,List } from '@mui/material'
import MsgInput from '../MessageInput/MsgInput'
import Message from '../Message/Message'


const MsgContainer = () => {
  return (
    <Box component="main" style={{width: '100%',height:'650px', overflowY:'hidden'}}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Room
          </Typography>
        </Toolbar>
      </AppBar>
      <List sx={{padding: '0 1rem',height:'520px', overflowY:'scroll'}}>
        <Message/>
      </List>
      <Divider/>
      <MsgInput/>
    </Box>
  )
}

export default MsgContainer