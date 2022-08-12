import { Box, TextField, Button, Grid } from '@mui/material'
import React from 'react'
import { Send } from '../../hooks/useMessage'

const MsgInput = () => {

   const handleSend  = async () => {
      await Send("test")
      console.log('test')
   }
   
   return (
         <Box sx={{padding: '1rem'}}>
            <Grid container spacing={1}>
               <Grid item lg={9}>
                  <TextField size='small' fullWidth/>
               </Grid>
               <Grid item lg={3}>
                  <Button variant="contained" fullWidth onClick={() => handleSend()}>Send</Button>
               </Grid>
            </Grid>
         </Box>
   )
}

export default MsgInput