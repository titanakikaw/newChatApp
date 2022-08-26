import React, { useContext, useState } from 'react'
import { Modal, Box, Typography, Autocomplete, TextField, Avatar, Grid, Button } from '@mui/material'
import { modalCreateContext } from '../../Authenticated/Authenticated';
import { AuthContext } from '../../../context/auth';
import { addMemberRoom } from '../../../services/firebase';
import { useParams } from 'react-router-dom'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '3px',
  boxShadow: 24,
  p: 2
};
const Index = ({members}) => {

  const [ selectedUsers, setSelectedUsers ] = useState();
  const [ currentMem, setCurrentMembers ] = useState();

  const { openAddMem , handleCloseMember } = useContext(modalCreateContext);
  const { users } = useContext(AuthContext);
  const { roomId } = useParams()
  const { user }  = useContext(AuthContext);


  const handleAddMembers = (newMember) => {
    setSelectedUsers(newMember)
  }


  const confirmAddMembers = () => {
    let membersId = [user.uid];
    selectedUsers.map((user) => {
      membersId.push(user.localId)
    })
    addMemberRoom(roomId, membersId)
  }

  return (
    <Modal
      open={openAddMem}
      onClose={handleCloseMember}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" textTransform={"uppercase"}>
          Add Members
        </Typography>
        <hr/>
        <Box>
          <Autocomplete
            size='small'
            multiple
            options={users}
            onChange={(event, newValue) => {
              handleAddMembers(newValue)
            }}
            filterSelectedOptions
            getOptionLabel = { (option) => {
              if(option.displayName){
                return option.displayName
              }
            }}
            sx={{p:0, margin: 0}}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search input"
              />
            )}
          />
        </Box>
        <hr/>
        <Button variant="contained" onClick={() => confirmAddMembers()}>Add Members</Button>
        <Button variant="contained" color="error" sx={{marginLeft:'10px'}} onClick={() => handleCloseMember(false)}>Cancel</Button>
      </Box>
    </Modal>
  )
}


export default Index