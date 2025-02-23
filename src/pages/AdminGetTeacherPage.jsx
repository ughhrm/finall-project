import React from 'react'
import AdminGetTeacherSection from '../components/adminGetTeacherSection/AdminGetTeacherSection'
import AdminHeader from '../components/adminHeader/AdminHeader'

const AdminGetTeacherPage = () => {
    return (
        <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
            <AdminHeader />
            <AdminGetTeacherSection />
        </div>
    )
}

export default AdminGetTeacherPage