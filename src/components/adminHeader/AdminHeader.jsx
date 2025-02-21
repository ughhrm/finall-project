import React from 'react';
import styles from './AdminHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { adminAuthLogOutThunk, adminLogInThunk } from '../../redux/slice/adminAuthSlice';

const AdminHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

      const handleLogout = async () => {
        const action = await dispatch(adminAuthLogOutThunk())
        if (adminAuthLogOutThunk.fulfilled.match(action)) {
          navigate('/')
        }
      }

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <h3>Alpha Academy</h3>
                </div>
                <div className={`${styles.btnBox} row-bet`}>
                    
                    <div className={styles.dropdown}>
                        <button>User Əlavə Et</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/user-signup")}>Yeni User</button>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button>Grouplar</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/get-group")}>Bütün Qruplar</button>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button>Qiymətləndirmə</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/student-evaluation-by")}>Qiymətləri Gör</button>
                            <button onClick={() => navigate("/student-evaluation-by")}>Qiymətləri Gör</button>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button>Qayıblar</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/student-attendance-by")}>Qayıblara Bax</button>
                        </div>
                    </div>
                    <div className={styles.dropdown}>
                        <button>Istifadeciler</button>
                        <div className={styles.dropdownMenu}>
                            <button onClick={() => navigate("/admin-getStudents")}>Sagirdler</button>
                            <button onClick={() => navigate("/admin-getTeachers")}>Mellimler</button>
                            <button onClick={() => navigate("/get-admin")}>Adminler</button>
                        </div>
                    </div>

                    <button onClick={handleLogout} className={styles.logOut}>Hesabdan Çıxış</button>
                </div>

                <div className={`${styles.hamburgerMenu} row`}>
                    <button><GiHamburgerMenu /></button>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
