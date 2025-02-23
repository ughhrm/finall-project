import React, { useState } from 'react';
import styles from './TeacherHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { userAuthLogOutThunk } from '../../redux/slice/userAuthSlice';

const TeacherHeader = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        const action = await dispatch(userAuthLogOutThunk());
        if (userAuthLogOutThunk.fulfilled.match(action)) {
            navigate('/');
        }
    };

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <h3>Alpha Academy</h3>
                </div>

                <div className={`${styles.btnBox} ${isMenuOpen ? styles.mobileMenu : ''}`}>
                    <button onClick={() => navigate("/teacher-evaluation")}>Qiymətləndirmə</button>
                    <button onClick={() => navigate("/teacher-attendance")}>Qayıblar</button>
                    <button className={styles.logout} onClick={handleLogout}>Hesabdan Çıxış</button>
                </div>

                <div className={styles.hamburgerMenu}>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        <GiHamburgerMenu />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeacherHeader;
