import React from 'react'
import styles from './SmalHeader.module.scss'
import { LuInstagram } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";

const SmalHeader = () => {
  return (
    <div className={`${styles.section} row`}>
      <div className={`${styles.content} row-bet`}>
            <div className={`${styles.address} row`}>
                <button>Bakı Mall, 2-ci mərtəbə</button>
                <button>+99451 302 65 39</button>

            </div>
            <div className={`${styles.icons} row`}>
                <button><LuInstagram/></button>
                <button><FaLinkedinIn/></button>
                <button><FaYoutube  /></button>
            </div>
        </div>
    </div>
  )
}

export default SmalHeader