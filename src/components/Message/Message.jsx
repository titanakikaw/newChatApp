import React, { useContext } from 'react'
import { Box, ListItem, ListItemAvatar, Avatar, Typography, ListItemText  } from '@mui/material'
import { AuthContext } from '../../context/auth'


const Message = ({ msgDetail }) => {
   const { user } = useContext(AuthContext)
   if(msgDetail.sentBy == user.user.displayName){
      return (
         <ListItem sx={{maxWidth: '100%'}}>
            <ListItemText  
               primary={
                  <Typography sx={{fontSize:'8px'}}>
                     { msgDetail.sentBy }
                  </Typography>
               }
               secondary={
                  <Typography sx={{
                     backgroundColor:'#1976d2', 
                     width:'fit-content', 
                     padding: '5px 10px', 
                     borderRadius: '10px', 
                     color:'white',
                     float:'right'
                  }}>
                  { msgDetail.text }
                  </Typography>
               }
               sx={{ textAlign:'right', paddingRight:'10px' }}
            />            
         </ListItem>
      )
   }
   else{
      return (
         <ListItem sx={{maxWidth: '50%'}}>
            <ListItemAvatar>
               <Avatar src={user.user.photoURL}/>
            </ListItemAvatar>
            <ListItemText  
               primary={
                  <Typography sx={{fontSize:'8px'}}>
                     { msgDetail.sentBy }
                  </Typography>
               }
               secondary={
                  <Typography sx={{
                     backgroundColor:'white', 
                     width:'fit-content', 
                     padding: '5px 10px', 
                     borderRadius: '10px', 
                     color:'black'
                  }}>
                  { msgDetail.text }
                  </Typography>
               }
            />     
         </ListItem>
      )
   } 
    
   
   
}

export default Message