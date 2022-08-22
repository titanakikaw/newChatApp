import React, { useState } from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'
import { signInWithCredentials } from '../../services/firebase'


function Unauthenticated() {
  const { login, loginWithCredentials } = useAuth();
  const [ credentials, setCredentials ] = useState({
    email : '',
    pass : ''
  });
 
  const setEmail = (email) => {
    setCredentials({...credentials, email : email })
  }
  const setPassword = (password) => {
    setCredentials({...credentials, pass : password })
  }

  const handleSignin = () => {
    loginWithCredentials(credentials)
  }
  return (
    <Box 
      sx={{
        margin:'5rem auto',
        padding: '10px 1rem',
        width: '250px',
       
      }}
    >
      <div className='input-fields' style={inputField}>
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          size='small' 
          sx={{
            width:'100%'
          }}
          onChange = {(e) => setEmail(e.target.value)}
          value = {credentials.email}
        />
      </div>
      <div className='input-fields' style={inputField}>
        <TextField 
          id="outlined-basic" 
          label="Password" 
          variant="outlined" 
          size='small' 
          type="password" 
          style={{
            width:'100%'
          }}
          
          onChange={(e) => setPassword(e.target.value)}
          value = {credentials.pass}
        />
      </div>

      <Button 
        variant="contained" 
        fullWidth="true"  
        size='small' 
        color='success'
        sx={{
          margin:'5px 0'
        }}
        onClick= {() => handleSignin()}
      >
        <Typography
          variant="caption"
        >
          Login
        </Typography>
      </Button>
      <Button 
        variant="contained" 
        fullWidth="true" 
        size='small'
        onClick={() => login()}
      >
        Sign in With Google
      </Button>
      <Button 
        variant="contained" 
        fullWidth="true" 
        size='small'
        sx={{
          margin:'5px 0'
        }}
      >
        Register
      </Button>
    </Box>
  )
}

const inputField = {
  margin:'1rem 0'
}

export default Unauthenticated