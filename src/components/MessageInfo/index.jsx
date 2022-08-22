import { Drawer, Box, Button, Typography} from '@mui/material'
import React from 'react' 

const Index = () => {
   return (
      <Drawer
         variant='permanent'
         anchor="right"
         sx={{overflowX: 'hidden'}}
      >
         <Box sx={{padding: '10px', display:'flex', justifyContent:'space-between'}}>
            <Typography variant='h5'>Messenger</Typography>
         </Box>
      </Drawer>  
   )
}

export default Index