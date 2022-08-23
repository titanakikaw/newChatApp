import React, { useContext, useEffect, useState } from 'react'
import { AppBar,Toolbar,Typography, Box, Divider,List, Grid, ListItem, ListItemButton, ListItemText, Avatar, Container, ListItemAvatar,Button } from '@mui/material'
import MsgInput from '../MessageInput/MsgInput'
import Message from '../Message/Message'
import AddIcon from '@mui/icons-material/Add';
import AddMemberModal from '../Modals/AddMember'
import { modalCreateContext } from '../Authenticated/Authenticated'
import { useParams } from 'react-router-dom'
import { getMessages } from '../../services/firebase'


const MsgContainer = () => {
  const { roomId } = useParams()
  const { handleOpenMember } = useContext(modalCreateContext)
  const [messages, setMessages ] = useState();
  const [members, setMembers] = useState();

  useEffect(() => {
    getMessages(roomId, setMessages)
  }, [roomId])

  return (
    <Box component="main" style={{width: '100%', overflowY:'hidden'}}>
      <Grid container>
        <Grid item md={8.5} sx={{backgroundColor:'#f3f3f3'}}>
          <Container>
            <AppBar position="static" sx={{backgroundColor:'transparent', boxShadow:'none', borderBottom: '1px solid grey'}}>
              <Toolbar variant="dense">
                <Typography variant="h6" color="black" display="block" gutterBottom>
                  Rooms
                </Typography>
              </Toolbar>
            </AppBar>            
            <List sx={{height:'540px', overflowY:'scroll'}}>
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
          <Container sx={{padding: '8px 0'}}>
            <Box sx={{display:'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Typography variant='subtitle1' gutterBottom fontWeight={'bold'} margin={'0px'} lineHeight={'0px'}>Members</Typography>
                <Button onClick={(e) => handleOpenMember()}><AddIcon /></Button>
            </Box>
            <hr/>
            <List sx={{padding: '0px'}}>
              <ListItem sx={{padding:'0px', textAlign:'center', margin: '5px 0'}}>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant='body2'>Members</Typography>
                </ListItemText>
              </ListItem>
              
              <ListItem sx={{padding:'0px', textAlign:'center', margin: '5px 0'}}>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant='body2'>Members</Typography>
                </ListItemText>
              </ListItem>
              
              <ListItem sx={{padding:'0px', textAlign:'center', margin: '5px 0'}}>
                <ListItemAvatar>
                    <Avatar></Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography variant='body2'>Members</Typography>
                </ListItemText>
              </ListItem>
              
            </List>
          </Container>
        </Grid> 
      </Grid>
      <AddMemberModal/>
    </Box>
  )
}


export default MsgContainer