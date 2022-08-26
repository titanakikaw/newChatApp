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
   let date = msgDetail.sentAt
   let convertedDate = date ?  date.toDate().toDateString() : ''


   
   if(msgDetail.sentBy == user.displayName){
      return (
         <React.Fragment>
            <ListItem sx={{maxWidth: '100%'}}>
               <ListItemText  
                  primary={
                     <Typography sx={{fontSize:'8px'}}>
                        { msgDetail.sentBy }
                     </Typography>
                  }
                  secondary={
                     <React.Fragment>
                        <Typography sx={{
                           backgroundColor:'#1976d2', 
                           width:'fit-content', 
                           padding: '8px 13px', 
                           borderRadius: '10px', 
                           color:'white',
                           float:'right',
                           fontSize: '11px'
                        }}>
                        { msgDetail.text }
                        </Typography>
                        <br/><br/>
                        <Typography sx={{fontSize:'8px'}}>
                           { convertedDate }
                        </Typography>
                     </React.Fragment>
                  }
                  sx={{ textAlign:'right', paddingRight:'10px' }}
               />            
               
            </ListItem>
         </React.Fragment>
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
                  <React.Fragment>
                     <Typography sx={{
                        backgroundColor:'white', 
                        width:'fit-content', 
                        padding: '8px 13px', 
                        borderRadius: '10px', 
                        color:'black',
                        fontSize: '11px'
                     }}>
                     { msgDetail.text }
                     </Typography>
                     <Typography sx={{fontSize:'8px'}}>
                        {  convertedDate  }
                     </Typography>
                  </React.Fragment>
               }
            />     
         </ListItem>
      )   
   } 
    
}

export default Message