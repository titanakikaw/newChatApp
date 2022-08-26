import React, { useContext, useEffect, useState } from 'react'
import { AppBar,Toolbar,Typography, Box, Divider,List, Grid, ListItem, ListItemButton, ListItemText, Avatar, Container, ListItemAvatar,Button } from '@mui/material'
import MsgInput from '../MessageInput/MsgInput'
import Message from '../Message/Message'
import { AddCircleOutline, ExitToApp } from '@mui/icons-material';

import AddMemberModal from '../Modals/AddMember'
import { modalCreateContext } from '../Authenticated/Authenticated'
import { useParams } from 'react-router-dom'
import { getMessages, getRoom } from '../../services/firebase'
import { AuthContext } from '../../context/auth';


const MsgContainer = () => {
  const { roomId } = useParams()
  const [ messages, setMessages ] = useState();
  const [ roomDetails, setRoomDetails] = useState();
  useEffect(() => {
    getMessages(roomId, setMessages)
    getRoom(roomId, setRoomDetails) 
  }, [roomId])
  return (
    <Box component="main" style={{width: '100%', overflowY:'hidden', height: '100vh'}}>
      <Grid container sx={{height:'100%'}}>
        <Grid item md={8.5} sx={{backgroundColor:'#f3f3f3', height:'100%'}}>
          <Container sx={{height:'100%'}}>
            <AppBar position="static" sx={{backgroundColor:'transparent', boxShadow:'none', borderBottom: '1px solid grey'}}>
              <Toolbar variant="dense">
                <Typography variant="h6" color="black" display="block" textTransform={'uppercase'} gutterBottom>
                  { roomDetails ? roomDetails.name : 'Loading . . .'}
                </Typography>
              </Toolbar>
            </AppBar>            
            <List sx={{overflowY:'scroll', height: '80%'}}>
              {
                messages ? messages.map((msg) => {
                  return  <Message msgDetail={msg} key={msg.id}/>
                }) : 'Loading . . .'
              }
            </List>
            <Divider/>
            <MsgInput/>
          </Container>
        </Grid>
        <Grid item md={3.5}>
            { roomDetails ? <MessageInformation members={roomDetails} />  : 'Loading'}
        </Grid> 
      </Grid>
      <AddMemberModal members={roomDetails ? roomDetails.members : '' }/>
    </Box>
  )

}

const MessageInformation = ({members}) => {
  const { handleOpenMember } = useContext(modalCreateContext)
  const [ currentMem, setCurrentMem ] = useState([]);
  const { users } = useContext(AuthContext); 

  useEffect(() => {
    setCurrentMem('')
    members.members.map((member) => {
      users.map((focusedUser) => {
        if(member == focusedUser.localId){
          setCurrentMem((prevState) => [...prevState, focusedUser])
        }
      })
    })
  }, [members])
  return(
    <Container sx={{padding: '8px 0'}}>
      <Button onClick={(e) => handleOpenMember()} sx={{width: '100%',p:1}}>
        <Box sx={{display:'flex',  alignItems:'center',  justifyContent:'space-between', width: '100%'}}>
            <Typography variant='subtitle1' gutterBottom margin={'0px'} lineHeight={'0px'} fontSize={'12px'}>Leave Conversation</Typography>
            <ExitToApp />
        </Box>
      </Button>
      <Button onClick={(e) =>handleOpenMember()} sx={{width: '100%',p:1}}>
        <Box sx={{display:'flex',  alignItems:'center',  justifyContent:'space-between', width: '100%'}}>
            <Typography variant='subtitle1' gutterBottom  margin={'0px'} lineHeight={'0px'} fontSize={'12px'}>Add Members</Typography>
            <AddCircleOutline />
        </Box>
      </Button>

      <hr/>
      <List sx={{padding: '0px'}}>
      {
        currentMem ? currentMem.map((user, index) => {
          return(
            <ListItem sx={{padding:'0px', textAlign:'center', margin: '5px 0'}} key={index}>
              <ListItemAvatar>
                  <Avatar src={user.photoUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText>
                <Typography variant='body2'>{user.displayName}</Typography>
              </ListItemText>
            </ListItem>
          )
        }) : 'Loading'
      }
      </List>
    </Container>
  )
}



export default MsgContainer