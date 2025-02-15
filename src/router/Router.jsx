import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import AdminPanel from '../pages/AdminPanel'
import StudentProfile from '../pages/StudentProfile'
import LoginPage from '../pages/LoginPage'
import SingUp from '../pages/SingUp'
import AdminLogin from '../pages/AdminLogin'
import AdminSignup from '../pages/AdminSignup'

const Router = () => {
    return (
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin-panel' element={<AdminPanel/>}/>
      <Route path='/notifications' element={<Notifications/>}/>
      <Route path='/student-profile' element={<StudentProfile/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/admin-login' element={<AdminLogin/>}/>
      <Route path='/singup' element={<SingUp/>}/>
      <Route path='/admin-singup' element={<AdminSignup/>}/>
      <Route path='/singup' element={<SingUp/>}/>
  </Routes>
  </BrowserRouter>
    )
  }

export default Router