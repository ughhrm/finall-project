import React from 'react'
import styles from './Footer.module.scss'
import { LuInstagram } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";


const Footer = () => {
  return (
    <div className={`${styles.footer} row`}>
    <div className={`${styles.content} row-bet`}>
    <h3>Alpha Academy</h3>
        <p>© Alpha Təlim Mərkəzi 2025  </p>
        <div className={`${styles.icons} row`}>
          <button><LuInstagram/></button>
          <button><FaLinkedinIn/></button>
          <button><FaYoutube/></button>
        </div>
    </div>
    </div>
  )
}

export default Footer