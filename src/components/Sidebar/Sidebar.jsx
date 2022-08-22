import React, { useContext, useState, useEffect } from 'react'
import { Box,Drawer, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, TextField, Button } from '@mui/material'
import { AuthContext } from '../../context/auth'
import { Create as CreateIcon, Settings } from '@mui/icons-material';
import { modalCreateContext } from '../Authenticated/Authenticated';
import { getGroups } from '../../services/firebase';
import { Link } from 'react-router-dom';

const Sidebar = () => {
   const { user } = useContext(AuthContext)
   const { handleCreateModal } = useContext(modalCreateContext)   
   const [groups, setGroups] = useState();
   useEffect(() => {
      getGroups(setGroups);
      
   }, [])
   return (
      <Drawer
         variant="permanent"
         PaperProps={{
            sx: { width: "300px", padding: '0', position: 'sticky' },
         }}
      >
         <Box sx={{padding: '10px', display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h6'>Conversation</Typography>
            <Button>
               <CreateIcon onClick={handleCreateModal}/>
            </Button>
         </Box>
         <Box sx={{padding: '10px'}}>
            <TextField size='small' label="Search Conversation"  style={{width: '100%'}}/>
         </Box>
         <List>
            <Divider/>
               {
                  groups ? groups.map((group, index) => {
                     let recentMessage = group.recentMessage ? group.recentMessage.displayName + ": " + group.recentMessage.messageText  : 'Say hi !'; 
                     return (
                        <React.Fragment key={index}>
                           <Link to={"/room/" + group.id}>
                              <ListItem key={index}>
                                    <ListItemAvatar>
                                       <Avatar></Avatar>
                                    </ListItemAvatar>
                                    <ListItemText 
                                       primary={
                                          <Typography variant="body1" fontWeight={"bold"} textTransform={"capitalize"}>
                                          {group.name}
                                          </Typography>
                                       }
                                       secondary = { 
                                          <Typography variant='caption' display="block" fontWeight={"bold"} gutterBottom sx={{fontSize: '8px'}}>{recentMessage}</Typography>  
                                       }
                                    />
                              </ListItem>
                              <Divider/>
                           </Link>
                        </React.Fragment>
                     ) 
                  })  : ''
               }       
         </List>
      </Drawer>
   
   )
}

export default Sidebar