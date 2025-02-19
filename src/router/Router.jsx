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
import UserSignUpByAdminPage from '../pages/UserSignUpByAdminPage'
import AdminGetStudentPage from '../pages/AdminGetStudentPage'
import AdminGetTeacherPage from '../pages/AdminGetTeacherPage'
import GetAdminPage from '../pages/GetAdminPage'
import GropupsPage from '../pages/GropupsPage'
import EvaluationPage from '../pages/EvaluationPage'

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
      <Route path='/user-signup' element={<UserSignUpByAdminPage/>}/>
      <Route path='/admin-singup' element={<AdminSignup/>}/>
      <Route path='/admin-getStudents' element={<AdminGetStudentPage/>}/>
      <Route path='/admin-getTeachers' element={<AdminGetTeacherPage/>}/>
      <Route path='/get-admin' element={<GetAdminPage/>}/>
      <Route path='/get-group' element={<GropupsPage/>}/>
      <Route path='/student-evaluation' element={<EvaluationPage/>}/>
  </Routes>
  </BrowserRouter>
    )
  }

export default Router