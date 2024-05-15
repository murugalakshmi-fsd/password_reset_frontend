import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouters from './routers/AppRouters'
export const API_URL="https://password-reset-backend-8ynl.onrender.com"
function App() {
 

  return (
    <>
     <BrowserRouter>
     <AppRouters/>
     </BrowserRouter>
    </>
  )
}

export default App
