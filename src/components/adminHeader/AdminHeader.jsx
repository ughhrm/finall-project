import React from 'react';
import styles from './AdminHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";

const AdminHeader = () => {
    const navigate = useNavigate();

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <img src="https://as2.ftcdn.net/jpg/01/12/09/17/1000_F_112091769_vWEmDiwVIpO4H1plGuhYgnmduTuiGUh2.jpg" alt="" />
                    <h3>Admin</h3>
                </div>
                <div className={`${styles.btnBox} row-bet`}>
                    <div className={styles.dropdown}>
                        <button>
                            Əlavə Et
                        </button>
                        <div className={styles.dropdownMenu}>
                            <a
                                href=""
                                className={styles.dropdownItem}
                                onClick={() => navigate("/login")}
                            >
                                Tələbə Əlavə Et
                            </a>
                            <a
                                href=""
                                className={styles.dropdownItem}
                                onClick={() => navigate("/teacher-login")}
                            >
                                Müəllim Əlavə Et
                            </a>
                            <a
                                href=""
                                className={styles.dropdownItem}
                                onClick={() => navigate("/student-login")}
                            >
                                Admin Əlavə Et
                            </a>
                        </div>
                    </div>

                    <div className={styles.dropdown}>
                        <button onClick={()=>navigate("/user-signup")}>UserƏlavə Et</button>

                    </div>

                </div>
                <div className={`${styles.hamburgerMenu} row`}>
                    <button><GiHamburgerMenu /></button>
                </div>
            </div>
        </div>
    );
};

export default AdminHeader;
