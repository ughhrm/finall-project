import React from 'react'

import AdminPanelSection from '../components/adminPanelSection/AdminPanelSection'
import AdminHeader from '../components/adminHeader/AdminHeader'

const AdminPanel = () => {
  return (
    <div>
     <AdminHeader/>
      <AdminPanelSection/>
    </div>
  )
}

export default AdminPanel