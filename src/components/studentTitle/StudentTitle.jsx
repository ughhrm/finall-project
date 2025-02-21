import React from 'react';
import styles from './StudentTitle.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch } from 'react-redux';
import { userAuthLogOutThunk } from '../../redux/slice/userAuthSlice';

const StudentTitle = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleLogout = async () => {
        const action = await dispatch(userAuthLogOutThunk())
        if (userAuthLogOutThunk.fulfilled.match(action)) {
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
                        <button onClick={() => navigate("/student-profile")}>Telebe Profili</button>

                    </div>
                    <div className={styles.dropdown}>
                        <button onClick={() => navigate("/student-attendance")}>Grouplar</button>

                    </div>

                    <div className={`${styles.dropdown} ${styles.logout}`}>
                    <button onClick={handleLogout}>Log out</button>

                    </div>
                    


                </div>
                <div className={`${styles.hamburgerMenu} row`}>
                    <button><GiHamburgerMenu /></button>
                </div>
            </div>
        </div>
    );
};

export default StudentTitle;
