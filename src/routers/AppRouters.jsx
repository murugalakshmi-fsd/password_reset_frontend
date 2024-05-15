import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Signup from '../pages/Signup'
import Signin from '../pages/Signin'
import ForgotPassword from '../pages/ForgotPassword'
import ResetPassword from '../pages/ResetPassword'

const AppRouters = () => {
  return (
   <>
   <Routes>
    <Route path="/home" element={<Home/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/signin' element={<Signin/>}></Route>
    <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
    <Route path='reset-password' element={<ResetPassword/>}></Route>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/*' element={<Navigate to='/'/>}></Route>
   </Routes>
   </>
  )
}

export default AppRouters