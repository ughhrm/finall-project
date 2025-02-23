import React from 'react'
import AdminHeader from '../components/adminHeader/AdminHeader'
import GetAdminSection from '../components/getAdminSection/GetAdminSection'

const GetAdminPage = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <AdminHeader/>
        <GetAdminSection/>
    </div>
  )
}

export default GetAdminPage