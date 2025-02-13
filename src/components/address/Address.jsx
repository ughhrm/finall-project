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
                        <iframe
                            title="Google Map"
                            width="100%"
                            height="100%"
                            style={{ border: 0 }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4253.474938791412!2d49.67556487365957!3d40.574617141639166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4030912b2cbbf477%3A0x6acc6600f49ba00e!2zU3VtcWF5xLF0IETDtnZsyZl0IFVuaXZlcnNpdGV0aQ!5e0!3m2!1saz!2saz!4v1739016194947!5m2!1saz!2saz"
                        ></iframe>
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
                        <p>Ünvan : Bakı Mall, 2-ci mərtəbə</p>
                        <p>Email :office@alpha.co.az</p>
                        <p>Mobil: +99451 302 65 39</p>
                        <p>Whatsapp: +99451 302 65 39</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Address