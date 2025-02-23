import React from 'react'
import styles from './CareerDestinations.module.scss'
import Title from '../title/Title'

const CareerDestinations = () => {
  return (
    <div className={`${styles.section} column`}>
        
        <Title  p={"Tələbələrimiz harda çalışır?"} /> 
        <div className={`${styles.content} row`}>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/1_pasha.svg" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/2.png" alt="" /></div>
            </div>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/3.png" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/4.png" alt="" /></div>
            </div>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/5.svg" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/6.svg" alt="" /></div>
            </div>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/ateshgahlife.png" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/logo_veyseloglu.png" alt="" /></div>
            </div>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/logo_ibar.svg" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/bank%20respublika.svg" alt="" /></div>
            </div>
            <div className={`${styles.cart} column`}>
                <div className={`${styles.topImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/bank%20of%20baku.png" alt="" /></div>
                <div className={`${styles.bottomImgBox} row`}><img src="https://matrixacademy.az/images/career_slider/logo_asan%20xidmet.svg" alt="" /></div>
            </div>
            
        </div>
        
        
    </div>
  )
}

export default CareerDestinations