import React from 'react'
import GroupSection from '../components/groupSection/GroupSection'
import AdminHeader from '../components/adminHeader/AdminHeader'


const GropupsPage = () => {
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
        <AdminHeader/>
        <GroupSection/> 
    </div>
  )
}

export default GropupsPage