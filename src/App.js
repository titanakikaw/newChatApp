import React, { useContext, useState } from 'react'
import { useAuth } from '../src/hooks/useAuth'
import Authenticated from './components/Authenticated/Authenticated'
import Unauthenticated from './components/Unauthenticated/Unauthenticated'
function App() {
  const { user } = useAuth()
  return (
    <div className="App">
      { user ? <Authenticated/> : <Unauthenticated/> }
    </div>
  )
}

export default App