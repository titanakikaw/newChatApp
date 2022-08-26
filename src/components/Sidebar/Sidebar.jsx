import React, { useContext, useState, useEffect } from 'react'
import { Box,Drawer, List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Divider, TextField, Button, ListItemButton, Badge} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../../context/auth'
import { Create as CreateIcon, Settings } from '@mui/icons-material';
import { modalCreateContext } from '../Authenticated/Authenticated';
import { getGroups } from '../../services/firebase';
import { Link } from 'react-router-dom';


const StyledBadge = styled(Badge)(({ theme }) => ({
   '& .MuiBadge-badge': {
     backgroundColor: '#44b700',
     color: '#44b700',
     boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
   }
 }));
 

const Sidebar = () => {
   const { user } = useContext(AuthContext)
   const { handleCreateModal } = useContext(modalCreateContext)   
   const [groups, setGroups] = useState();
   useEffect(() => {
      getGroups( user.uid ,setGroups);  
   }, [])

   return (
      <Drawer
         variant="permanent"
         PaperProps={{
            sx: { width: "300px", padding: '0', position: 'sticky', height:'100vh' },
         }}
      >
       
         <Box sx={{padding: '10px', display:'flex', alignItems:'center'}}>
            <StyledBadge
               overlap="circular"
               anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
               variant="dot"
               sx={{marginRight:'1rem'}}
            >
               <Avatar alt="Remy Sharp" src={user.photoURL} />
            </StyledBadge>
            <Box>
               <Typography variant="h6" margin={0} padding={0} fontWeight={'bold'}>{ user.displayName }</Typography>
               <Typography variant="caption"  margin={0} padding={0} color={'grey'}> { user.email }</Typography>
            </Box>
           
         </Box>
        
         <Box sx={{padding: '10px'}}>
            <TextField size='small' label="Search Conversation"  style={{width: '100%'}}/>
         </Box>
         <List>
            <Divider/>
               {
                  groups ? groups.map((group, index) => {
                     let recentMessage = group.latestMsg ? group.latestMsg  : 'Say hi !'; 
                     return (
                        <React.Fragment key={index}>
                           <Link to={"/room/" + group.id}>
                              <ListItemButton sx={{p:0}}>
                                 <ListItem key={index}>
                                       <ListItemAvatar>
                                          <Avatar {...stringAvatar(group.name)}></Avatar> 
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
                              </ListItemButton>
                           </Link>
                        </React.Fragment>
                     ) 
                  })  : ''
               }       
         </List>
      </Drawer>
   )
}


function stringToColor(string) {
   let hash = 0;
   let i;
 
   /* eslint-disable no-bitwise */
   for (i = 0; i < string.length; i += 1) {
     hash = string.charCodeAt(i) + ((hash << 5) - hash);
   }
 
   let color = '#';
 
   for (i = 0; i < 3; i += 1) {
     const value = (hash >> (i * 8)) & 0xff;
     color += `00${value.toString(16)}`.slice(-2);
   }
   /* eslint-enable no-bitwise */
 
   return color;
 }
 
 function stringAvatar(name) {
   // console.log(name)
   return {
     sx: {
       bgcolor: stringToColor(name),
     },
     children: name[0],
   };
 }
export default Sidebar