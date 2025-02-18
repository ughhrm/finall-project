import React from 'react'
import AdminGetStudentSection from '../components/adminGetStudentSection/AdminGetStudentSection'
import AdminHeader from '../components/adminHeader/AdminHeader'

const AdminGetStudentPage = () => {
  return (
<div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <AdminHeader/>
        <AdminGetStudentSection/>
    </div>
  )
}

export default AdminGetStudentPage