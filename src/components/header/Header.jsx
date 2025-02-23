import React, { useState } from 'react';
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className={`${styles.header} row`}>
            <div className={`${styles.content} row-bet`}>
                <div className={`${styles.logoBox} row`}>
                    <h3>Alpha Academy</h3>
                </div>
                
                <div className={styles.hamburgerMenu}>
                    <button onClick={() => setMenuOpen(!menuOpen)}>
                        {menuOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
                    </button>
                </div>

                <div className={`${styles.btnBox} ${menuOpen ? styles.open : ''}`}>
                    <button onClick={() => navigate("admin-login")}>
                        Admin Login
                    </button>
                    <button onClick={() => navigate("admin-singup")}>
                        Admin Signup
                    </button>
                    <button onClick={() => navigate("/student-profile")}>
                        Tələbə Profili
                    </button>
                    <button className={styles.loginBtn} onClick={() => navigate("/login")}>
                        Daxil olun
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className={styles.mobileMenu}>
                    <button onClick={() => navigate("admin-login")}>
                        Admin Login
                    </button>
                    <button onClick={() => navigate("admin-singup")}>
                        Admin Signup
                    </button>
                    <button onClick={() => navigate("/student-profile")}>
                        Tələbə Profili
                    </button>
                    <button className={styles.loginBtn} onClick={() => navigate("/login")}>
                        Daxil olun
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
