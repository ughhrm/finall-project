import React, { useState } from 'react';
import styles from './AdminHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { adminAuthLogOutThunk } from '../../redux/slice/adminAuthSlice';

const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = async () => {
        const action = await dispatch(adminAuthLogOutThunk());
        if (adminAuthLogOutThunk.fulfilled.match(action)) {
            navigate('/');
        }
    };

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <h3>Alpha Academy</h3>
                </div>
                
                <div className={`${styles.btnBox} row-bet ${menuOpen ? styles.open : ''}`}>
                    <button onClick={() => navigate("/user-signup")}>Yeni User</button>
                    <button onClick={() => navigate("/get-group")}> Qruplar</button>
                    <button onClick={() => navigate("/student-evaluation-by")}>Qiymətləri </button>
                    <button onClick={() => navigate("/student-attendance-by")}>Qayıblara </button>
                    
                    <div className={styles.dropdownContainer}>
                        <button>İstifadəçilər</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/admin-getStudents")}>Şagirdlər</button>
                            <button onClick={() => navigate("/admin-getTeachers")}>Müəllimlər</button>
                            <button onClick={() => navigate("/get-admin")}>Adminlər</button>
                        </div>
                    </div>

                    <button onClick={handleLogout} className={styles.logOut}>Hesabdan Çıxış</button>
                </div>

                <div className={`${styles.hamburgerMenu} row`}>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
