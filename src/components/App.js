import React from 'react'
import { AuthProvider } from '../contexts/AuthContext';
import Signin from './Signin'

function App() {
  return (
    <AuthProvider>
      <Signin />
    </AuthProvider>
  )
}

export default App;
