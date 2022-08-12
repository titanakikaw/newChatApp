import React from 'react'
import { Box, TextField, Button, Typography } from '@mui/material'
import { useAuth } from '../../hooks/useAuth'


function Unauthenticated() {
  const { login } = useAuth();
  return (
    <Box 
      sx={{
        margin:'5rem auto',
        padding: '10px 1rem',
        width: '250px',
        boxShadow: '5px 7px 10px -5px rgba(0,0,0,.33);',
        borderRadius:'3px'
      }}
    >

      <Typography variant='h5' sx={{textAlign:'center', fontWeight:'bold'}}>GMessage</Typography>
      <div className='input-fields' style={inputField}>
        <TextField 
          id="outlined-basic" 
          label="Email" 
          variant="outlined" 
          size='small' 
          sx={{
            width:'100%'
          }}
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
    </Box>
  )
}

const inputField = {
  margin:'1rem 0'
}

export default Unauthenticated