import React, { createContext, useState } from 'react'
import MsgContainer from '../MessageContainer/MsgContainer'
import Sidebar from '../Sidebar/Sidebar'
import { Box } from '@mui/material'
import CreateContainer from '../Modals/CreateMessage'
import { Routes, Route } from 'react-router-dom'

export const modalCreateContext = createContext()

function Authenticated() {
  const [openCreate, setOpenCreate] = useState(false);
 
  const handleCreateModal = () => {
    setOpenCreate(!openCreate)
  }

  return (
    <modalCreateContext.Provider value={{
      open : openCreate,
      handleCreateModal: handleCreateModal
    }}>
      <Box sx={{ display: 'flex' }}>
        <Box>
          <Sidebar/>
        </Box>
        <Routes>
          <Route path="/room/:roomId" element={
            <MsgContainer/>
          }/>
       
        </Routes>
        <CreateContainer/>
      </Box>
    </modalCreateContext.Provider>
  )
}

export default Authenticated