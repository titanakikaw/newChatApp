import { Box, TextField, Button, Grid } from '@mui/material'
import React, { useContext, useRef } from 'react'
import { Send } from '../../hooks/useMessage'
import { AuthContext } from '../../context/auth'
import { useParams } from 'react-router-dom'
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
const MsgInput = () => {
   const { user } = useContext(AuthContext)
   const { roomId }= useParams();
   const Text = useRef();
   const handleSend = () => {
      Send(Text.current.value, roomId ,user.displayName)
   }
   return (
         <Box sx={{padding: '1rem'}}>
            <Grid container spacing={1}>
               <Grid item lg={9} xs={9}>
                  <input type="text" ref={Text} style={{padding: '10px', width: '-webkit-fill-available'}}/>
               </Grid>
               <Grid item lg={3}>
                  <Button variant="contained" fullWidth onClick={() => handleSend()}>
                     <SendOutlinedIcon/>
                     
                  </Button>
               </Grid>
            </Grid>
         </Box>
   )
}

export default MsgInput