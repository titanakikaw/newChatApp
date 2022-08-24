import React, { useContext, useEffect, useState } from 'react'
import { Box, ListItem, ListItemAvatar, Avatar, Typography, ListItemText  } from '@mui/material'
import { AuthContext } from '../../context/auth'


const Message = ({ msgDetail }) => {
   const { users } = useContext(AuthContext);
   const { user } = useContext(AuthContext);
   const [data, setData] = useState();
   useEffect(() => {
      users.map((user1) => {
         if(msgDetail.sentBy === user1.displayName){
            setData(user1)
         }
      })
   },[])

   
   if(msgDetail.sentBy == user.displayName){
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
               <Avatar src={ data ? data.photoUrl : ''} />
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