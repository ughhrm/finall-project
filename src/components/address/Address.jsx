import React from 'react'
import styles from './Address.module.scss'
import image from '../../img/image.png';


const Address = () => {
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row`}>

            <div className={`${styles.mapBox} column-bet`}>
                <h5>Ünvan</h5>
                <div className={`${styles.mapImg} row`}>
                <img src={image} alt="Example" />
                </div>
            </div>
            <div className={`${styles.cart} column-bet`}>
                <h5 >Menu</h5>
                <div className={`${styles.info} column-bet`}>
                    <p>Haqqımızda</p>
                    <p>Təlimlər</p>
                    <p>Əlaqə</p>
                    <p>Faq</p>
                </div>
            </div>
            <div className={`${styles.cart} column-bet`}>
                <h5>Ətraflı</h5>
                <div className={`${styles.info} column-bet`}>
                    <p>Ünvan : AF Mall, 2-ci mərtəbə</p>
                    <p>Email :office@matrix.co.az</p>
                    <p>Mobil: +99450 725 20 26</p>
                    <p>Whatsapp: +99450 725 20 26</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Address