import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import AdminPanel from '../pages/AdminPanel'
import StudentProfile from '../pages/StudentProfile'

const Router = () => {
  return (
<BrowserRouter>
<Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/admin-panel' element={<AdminPanel/>}/>
    <Route path='/notifications' element={<Notifications/>}/>
    <Route path='/student-profile' element={<StudentProfile/>}/>
</Routes>
</BrowserRouter>
  )
}

export default Router