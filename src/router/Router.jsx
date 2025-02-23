import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Notifications from '../pages/Notifications'
import AdminPanel from '../pages/AdminPanel'
import StudentProfile from '../pages/StudentProfile'
import LoginPage from '../pages/LoginPage'
import AdminLogin from '../pages/AdminLogin'
import AdminSignup from '../pages/AdminSignup'
import UserSignUpByAdminPage from '../pages/UserSignUpByAdminPage'
import AdminGetStudentPage from '../pages/AdminGetStudentPage'
import AdminGetTeacherPage from '../pages/AdminGetTeacherPage'
import GetAdminPage from '../pages/GetAdminPage'
import GropupsPage from '../pages/GropupsPage'
import EvaluationPage from '../pages/EvaluationPage'
import AttendancePage from '../pages/AttendancePage'
import StudentAttendancePage from '../pages/StudentAttendancePage'
import ChangePasswordPage from '../pages/ChangePasswordPage'
import NotFoundPage from '../pages/NotFoundPage'
import NotificationSendPage from '../pages/NotificationSendPage'
import TeacherEvaluationPage from '../pages/TeacherEvaluationPage'
import TeacherAttendancePage from '../pages/TeacherAttendancePage'
import AdminNotificationPage from '../pages/AdminNotificationPage'

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
      <Route path='/student-evaluation-by' element={<EvaluationPage/>}/>
      <Route path='/student-attendance-by' element={<AttendancePage/>}/>
      <Route path='/student-attendance' element={<StudentAttendancePage/>}/>
      <Route path='/change-password' element={<ChangePasswordPage/>}/>
      <Route path='*' element={<NotFoundPage/>}/>
      <Route path='/notification-send' element={<NotificationSendPage/>}/>
      <Route path='/admin-notification' element={<AdminNotificationPage/>}/>
      <Route path='/teacher-evaluation' element={<TeacherEvaluationPage/>}/>
      <Route path='/teacher-attendance' element={<TeacherAttendancePage/>}/>

  </Routes>
  </BrowserRouter>
    )
  }

export default Router