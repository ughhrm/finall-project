import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import AdminPanel from '../pages/AdminPanel'
import StudentProfile from '../pages/StudentProfile'
import LoginPage from '../pages/LoginPage'
import SingUp from '../pages/SingUp'

const Router = () => {
    return (
  <BrowserRouter>
  <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/admin-panel' element={<AdminPanel/>}/>
      <Route path='/notifications' element={<Notifications/>}/>
      <Route path='/student-profile' element={<StudentProfile/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/singup' element={<SingUp/>}/>
  </Routes>
  </BrowserRouter>
    )
  }

export default Router