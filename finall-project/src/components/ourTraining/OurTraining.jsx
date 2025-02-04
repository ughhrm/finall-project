import React from 'react'
import styles from './OurTraining.module.scss'
import Title from '../title/Title'

const OurTraining = () => {
  return (
    <div className={`${styles.section} row`}>
        <div className={`${styles.content} row`}>
            <div className={`${styles.cart} row`}>
                <div className={`${styles.imgBox} row`}>
                <img src="https://matrixacademy.az/images/html-5.png" alt="" />
                </div>
                <div className={`${styles.info} column`}>
                    <h4>Front-End</h4>
                    <p>Müddət : 6 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/database.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>Oracle SQL & PL/SQL</h4>
                    <p>Müddət : 4 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/idea.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>Qrafik Dizayn</h4>
                    <p>Müddət : 4 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/java.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>Java</h4>
                    <p>Müddət : 7 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/android.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>Android</h4>
                    <p>Müddət : 6 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/html-5.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>UI/UX Dizayn​</h4>
                    <p>Müddət : 5 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/php.png" alt="" />

                    </div>
                <div className={`${styles.info} column`}>
                    <h4>PHP</h4>
                    <p>Müddət : 4 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/hashtag.png" alt="" />
    
                    </div>
                <div className={`${styles.info} column`}>
                    <h4>C#</h4>
                    <p>Müddət : 7 ay</p>
                </div>
            </div>

            <div className={`${styles.cart} row`}>
            <div className={`${styles.imgBox} row`}>
            <img src="https://matrixacademy.az/images/icon2.png" alt="" />
                    </div>
                <div className={`${styles.info} column`}>
                    <h4>2D Animasiya</h4>
                    <p>Müddət : 5 ay</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default OurTraining