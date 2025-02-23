import React from 'react'
import styles from "./Header.module.scss"

const Header = () => {
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
                <button className={`${styles.loginBtn}`} >Daxil olun</button>
            </div>
            
        </div>
    </div>
  )
}

export default Header