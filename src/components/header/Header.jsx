import React from 'react'
import styles from "./Header.module.scss"
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from 'react-router-dom';



const Header = () => {
    const navigate = useNavigate()
  return (
    <div className={`${styles.header} row`}>
        <div className={`${styles.content} row-bet`}>
            <div className={`${styles.logoBox} row`}>
                <h3>Alpha Academy</h3>
            </div>
            <div className={`${styles.btnBox} row-bet`}>
                <button>Ev</button>
                <button>Bildirişlər</button>
                <button>Tələbə Profili</button>
                <button className={`${styles.loginBtn}`} onClick={()=>navigate("/login")} >Daxil olun</button>
            </div>
            <div className={`${styles.hamburgerMenu} row`}>
                <button><GiHamburgerMenu/></button>
            </div>
            
            
        </div>
    </div>
  )
}

export default Header