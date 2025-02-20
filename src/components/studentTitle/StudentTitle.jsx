import React from 'react';
import styles from './StudentTitle.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const StudentTitle = () => {
    const navigate = useNavigate();

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <h3>Alpha Academy</h3>
                </div>
                <div className={`${styles.btnBox} row-bet`}>
                
                    <div className={styles.dropdown}>
                        <button onClick={() => navigate("/user-signup")}>User Əlavə Et</button>

                    </div>
                    <div className={styles.dropdown}>
                        <button onClick={() => navigate("/get-group")}>Grouplar</button>

                    </div>
                    <div className={styles.dropdown}>
                        <button onClick={() => navigate("/student-evaluation-by")}>QIYMETLENDIRME</button>

                    </div>
                    <div className={styles.dropdown}>
                        <button onClick={() => navigate("/student-attendance-by")}>qayiblar</button>

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
