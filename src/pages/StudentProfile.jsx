import React from 'react'
import ProfileTitle from '../components/pageTitle/ProfileTitle'
import StudentProfileSection from '../components/studentProfileSection/StudentProfileSection'
import AdminHeader from '../components/adminHeader/AdminHeader'
import StudentTitle from '../components/studentTitle/StudentTitle'

const StudentProfile = () => {
  return (
    <div>
      <StudentTitle/>
      <StudentProfileSection/>
    </div>
  )
}

export default StudentProfile