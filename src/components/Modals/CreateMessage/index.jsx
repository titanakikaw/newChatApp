import React, { useContext } from 'react'
import { Modal, Box, Typography, TextField, Button } from '@mui/material'
import { modalCreateContext } from '../../Authenticated/Authenticated';
import { createGroup } from '../../../services/firebase';

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '1px solid #f3f3f3',
   boxShadow: 24,
   borderRadius: '5px',
   p: 4,
};

const Index = () => {
   const { open, handleCreateModal } = useContext(modalCreateContext)
   return (
         <React.Fragment>
            <Modal
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
               open={open}
               onClose={handleCreateModal}
            >
               <Box sx={style}>
                  <Typography id="modal-modal-title" variant="h6" >
                     Create New Group
                  </Typography>
                  <div className='input-create' style={{margin:'10px 0'}}>
                     <TextField label="Group Name" sx={{width:'100%'}}/>
                  </div>
                  <div className='input-create'>
                     <Button variant="contained" onClick={createGroup}>Create</Button>
                  </div>
               </Box>
            </Modal> 
         </React.Fragment>
   )
}
export default Index