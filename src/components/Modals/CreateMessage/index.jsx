import React, { useContext, useState } from 'react'
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
   const { open, handleCreateModal, handleCloseModal } = useContext(modalCreateContext)
   const [name, setName] = useState();

   const handleChange = (e) => {
      setName(e.target.value)
   }

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
                     <input type="text" className="modalTextField" style={{padding:'10px', width:'100%'}} onChange={(e) => handleChange(e)} />
                  </div>
                  <div className='input-create'>
                     <Button variant="contained" onClick={() => createGroup(name)}>Create</Button>
                     <Button variant="contained" onClick={() => handleCloseModal(name)}>Cancel</Button>
                  </div>
               </Box>
            </Modal> 
         </React.Fragment>
   )
}
export default Index